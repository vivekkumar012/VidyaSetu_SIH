import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import authRoutes from "./routes/userRouter.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

// Socket.IO setup
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// In-memory room host mapping: roomId -> teacherSocketId
const roomHosts = new Map();
// Ephemeral state for polls/quizzes: roomId -> { polls: Map, quizzes: Map }
const roomState = new Map();

// Middlewares
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Socket.IO signaling
io.on("connection", (socket) => {
  // Teacher creates/starts a class
  socket.on("room:create", ({ roomId }) => {
    if (!roomId) return;
    roomHosts.set(roomId, socket.id);
    socket.join(roomId);
    if (!roomState.has(roomId)) roomState.set(roomId, { polls: new Map(), quizzes: new Map() });
    io.to(socket.id).emit("room:created", { roomId });
  });

  // Student joins an existing class
  socket.on("room:join", ({ roomId }) => {
    const hostId = roomHosts.get(roomId);
    if (!hostId) {
      io.to(socket.id).emit("room:error", { message: "Room not found or not started." });
      return;
    }
    socket.join(roomId);
    // Notify teacher that a student joined
    io.to(hostId).emit("peer:join", { studentId: socket.id, roomId });
    // Acknowledge student join
    io.to(socket.id).emit("room:joined", { roomId, hostId });
  });

  // Simple text chat relay within a room
  socket.on("chat:send", ({ roomId, text, sender }) => {
    if (!roomId || !text) return;
    const payload = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text,
      sender: sender || { id: socket.id, role: "unknown", name: "Guest" },
      ts: Date.now(),
    };
    io.to(roomId).emit("chat:new", payload);
  });

  // WebRTC signaling relays
  socket.on("webrtc:offer", ({ to, sdp }) => {
    if (to && sdp) io.to(to).emit("webrtc:offer", { from: socket.id, sdp });
  });

  socket.on("webrtc:answer", ({ to, sdp }) => {
    if (to && sdp) io.to(to).emit("webrtc:answer", { from: socket.id, sdp });
  });

  socket.on("webrtc:ice-candidate", ({ to, candidate }) => {
    if (to && candidate) io.to(to).emit("webrtc:ice-candidate", { from: socket.id, candidate });
  });

  socket.on("disconnect", () => {
    // Clean up any rooms where this socket was the host
    for (const [roomId, hostId] of roomHosts.entries()) {
      if (hostId === socket.id) {
        roomHosts.delete(roomId);
        roomState.delete(roomId);
        // Inform students that class has ended
        io.to(roomId).emit("room:ended", { roomId });
      }
    }
  });
});

// Polls
io.on("connection", (socket) => {
  socket.on("poll:create", ({ roomId, poll }) => {
    if (!roomId || !poll?.id) return;
    const st = roomState.get(roomId) || { polls: new Map(), quizzes: new Map() };
    if (!roomState.has(roomId)) roomState.set(roomId, st);
    st.polls.set(poll.id, { ...poll, votes: {} });
    io.to(roomId).emit("poll:new", st.polls.get(poll.id));
  });

  socket.on("poll:vote", ({ roomId, pollId, choice, studentId }) => {
    const st = roomState.get(roomId);
    if (!st) return;
    const p = st.polls.get(pollId);
    if (!p) return;
    p.votes[studentId || socket.id] = choice;
    io.to(roomId).emit("poll:update", { pollId, votes: p.votes });
  });

  // Quizzes
  socket.on("quiz:create", ({ roomId, quiz }) => {
    if (!roomId || !quiz?.id) return;
    const st = roomState.get(roomId) || { polls: new Map(), quizzes: new Map() };
    if (!roomState.has(roomId)) roomState.set(roomId, st);
    st.quizzes.set(quiz.id, { ...quiz, answers: {} });
    io.to(roomId).emit("quiz:new", st.quizzes.get(quiz.id));
  });

  socket.on("quiz:answer", ({ roomId, quizId, answer, studentId }) => {
    const st = roomState.get(roomId);
    if (!st) return;
    const q = st.quizzes.get(quizId);
    if (!q) return;
    q.answers[studentId || socket.id] = answer;
    io.to(roomId).emit("quiz:update", { quizId, answers: q.answers });
  });
});

// MongoDB connection
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
  console.log(`🔗 Allowing frontend origin: ${FRONTEND_ORIGIN}`);
});

// Try connecting to Mongo, but do not block server start
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err?.message || err);
  });

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Promise Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
