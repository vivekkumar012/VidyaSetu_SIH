import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const SIGNALING_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function Classroom() {
  const { roomId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const role = new URLSearchParams(location.search).get("role") || "student";

  const socket = useMemo(() => io(SIGNALING_URL, { withCredentials: true }), []);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const [connectedPeerId, setConnectedPeerId] = useState(null);
  const [status, setStatus] = useState("Initializing...");
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [elapsed, setElapsed] = useState(0); // seconds
  const timerRef = useRef(null);
  const [activePanel, setActivePanel] = useState("chat"); // chat | polls | quizzes
  const [polls, setPolls] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const config = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
      ],
    };

    pcRef.current = new RTCPeerConnection(config);

    // For students, ensure we have recvonly transceivers so SDP lines are present
    if (role !== "teacher") {
      try {
        pcRef.current.addTransceiver("video", { direction: "recvonly" });
        pcRef.current.addTransceiver("audio", { direction: "recvonly" });
      } catch {}
    }

    pcRef.current.onicecandidate = (e) => {
      if (e.candidate && connectedPeerId) {
        socket.emit("webrtc:ice-candidate", { to: connectedPeerId, candidate: e.candidate });
      }
    };

    pcRef.current.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    pcRef.current.onconnectionstatechange = () => {
      const st = pcRef.current.connectionState;
      if (st === "connected") setStatus("Connected!");
      else if (st === "failed") setStatus("Connection failed.");
      else if (st === "disconnected") setStatus("Disconnected.");
    };

    const initMediaIfTeacher = async () => {
      if (role !== "teacher") return; // Students do not capture media
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach((track) => pcRef.current.addTrack(track, stream));
      } catch (err) {
        console.error("Media error", err);
        setStatus("Failed to access camera/microphone");
      }
    };

    initMediaIfTeacher().then(() => {
      if (role === "teacher") {
        socket.emit("room:create", { roomId });
        setStatus("Class started. Waiting for students to join...");
      } else {
        socket.emit("room:join", { roomId });
        setStatus("Joining class... contacting teacher...");
      }
    });

    socket.on("room:created", () => {
      setStatus("Classroom ready. Share the room code with students.");
      if (role === "teacher" && !timerRef.current) {
        timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
      }
    });
    socket.on("room:joined", ({ hostId }) => {
      setConnectedPeerId(hostId);
      setStatus("Connected to teacher. Negotiating media...");
    });
    socket.on("room:error", ({ message }) => setStatus(message || "Room error"));
    socket.on("room:ended", () => {
      setStatus("Class ended by teacher.");
      if (role !== "teacher") {
        alert("Class ended by teacher");
        navigate("/studentDashboard");
      }
    });

    // Socket connection lifecycle
    socket.on("connect", () => {
      // Keep current status but log connectivity
      console.debug("Socket connected", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("Socket connect_error", err);
      setStatus(`Unable to reach server: ${err?.message || "connection error"}`);
    });
    socket.on("disconnect", (reason) => {
      console.warn("Socket disconnected", reason);
      setStatus(`Disconnected: ${reason}`);
    });

    // Teacher handles student arrival -> create offer
    socket.on("peer:join", async ({ studentId }) => {
      if (role !== "teacher") return;
      setConnectedPeerId(studentId);
      try {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        socket.emit("webrtc:offer", { to: studentId, sdp: offer });
        setStatus("Student joined. Sending offer...");
      } catch (err) {
        console.error("Offer error", err);
      }
    });

    // Student receives offer from teacher
    socket.on("webrtc:offer", async ({ from, sdp }) => {
      if (role !== "student") return;
      setConnectedPeerId(from);
      try {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);
        socket.emit("webrtc:answer", { to: from, sdp: answer });
        setStatus("Received offer. Sending answer...");
      } catch (err) {
        console.error("Answer error", err);
      }
    });

    // Teacher receives answer from student
    socket.on("webrtc:answer", async ({ from, sdp }) => {
      if (role !== "teacher") return;
      try {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        setStatus("Connected!");
      } catch (err) {
        console.error("Set remote desc error", err);
      }
    });

    // Both sides handle ICE candidates
    socket.on("webrtc:ice-candidate", async ({ from, candidate }) => {
      try {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error("ICE error", err);
      }
    });

    // Chat events
    socket.on("chat:new", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Polls
    socket.on("poll:new", (poll) => {
      setPolls((prev) => [poll, ...prev.filter((p) => p.id !== poll.id)]);
    });
    socket.on("poll:update", ({ pollId, votes }) => {
      setPolls((prev) => prev.map((p) => (p.id === pollId ? { ...p, votes } : p)));
    });

    // Quizzes
    socket.on("quiz:new", (quiz) => {
      setQuizzes((prev) => [quiz, ...prev.filter((q) => q.id !== quiz.id)]);
    });
    socket.on("quiz:update", ({ quizId, answers }) => {
      setQuizzes((prev) => prev.map((q) => (q.id === quizId ? { ...q, answers } : q)));
    });
    return () => {
      socket.disconnect();
      pcRef.current?.close();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [roomId, role]);

  const toggleMute = () => {
    if (role !== "teacher") return; // only teacher can toggle
    const audioTracks = localStreamRef.current?.getAudioTracks();
    if (audioTracks && audioTracks[0]) {
      audioTracks[0].enabled = !audioTracks[0].enabled;
      setMuted(!audioTracks[0].enabled);
    }
  };

  const toggleCamera = () => {
    const videoTracks = localStreamRef.current?.getVideoTracks();
    if (videoTracks && videoTracks[0]) {
      videoTracks[0].enabled = !videoTracks[0].enabled;
      setCameraOff(!videoTracks[0].enabled);
    }
  };

  const leaveClass = () => {
    navigate(-1);
  };

  const sendMessage = (e) => {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text) return;
    const sender = { id: socket.id, role, name: role === "teacher" ? "Teacher" : "Student" };
    socket.emit("chat:send", { roomId, text, sender });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Live Classroom</h1>
          <div className="text-sm opacity-80 flex items-center gap-3">
            <span>Room: {roomId}</span>
            <span>Role: {role}</span>
            {role === "teacher" && (
              <span className="px-2 py-1 rounded bg-white/10 border border-white/10">
                ⏱ {Math.floor(elapsed / 60).toString().padStart(2, "0")}:{(elapsed % 60)
                  .toString()
                  .padStart(2, "0")}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4 text-cyan-400">{status}</div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2 bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center">
            {role === "teacher" ? (
              <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            )}
          </div>
          <div className="lg:col-span-1 bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col min-h-[350px]">
            <div className="flex items-center gap-2 text-sm font-semibold mb-3">
              <button onClick={() => setActivePanel("chat")} className={`px-3 py-1 rounded ${activePanel==='chat' ? 'bg-cyan-600' : 'bg-white/10'}`}>Chat</button>
              <button onClick={() => setActivePanel("polls")} className={`px-3 py-1 rounded ${activePanel==='polls' ? 'bg-cyan-600' : 'bg-white/10'}`}>Polls</button>
              <button onClick={() => setActivePanel("quizzes")} className={`px-3 py-1 rounded ${activePanel==='quizzes' ? 'bg-cyan-600' : 'bg-white/10'}`}>Quizzes</button>
            </div>
            {activePanel === 'chat' && (
            <>
            <div className="text-sm font-semibold mb-2">Live Chat</div>
            <div className="flex-1 overflow-auto space-y-2 pr-1" id="chat-scroll">
              {messages.length === 0 && (
                <div className="text-white/50 text-sm">No messages yet.</div>
              )}
              {messages.map((m) => (
                <div key={m.id} className="text-sm">
                  <span className="text-cyan-400 mr-2">[{new Date(m.ts).toLocaleTimeString()}]</span>
                  <span className="font-semibold mr-2">{m.sender?.role === 'teacher' ? 'Teacher' : 'Student'}</span>
                  <span className="text-white/90">{m.text}</span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="mt-3 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <button type="submit" className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700">Send</button>
            </form>
            </>
            )}
            {activePanel === 'polls' && (
              <div className="flex-1 overflow-auto">
                {role === 'teacher' && (
                  <PollCreator onCreate={(poll) => socket.emit('poll:create', { roomId, poll })} />
                )}
                <PollList polls={polls} onVote={(pollId, choice) => socket.emit('poll:vote', { roomId, pollId, choice })} />
              </div>
            )}
            {activePanel === 'quizzes' && (
              <div className="flex-1 overflow-auto">
                {role === 'teacher' && (
                  <QuizCreator onCreate={(quiz) => socket.emit('quiz:create', { roomId, quiz })} />
                )}
                <QuizList quizzes={quizzes} onAnswer={(quizId, answer) => socket.emit('quiz:answer', { roomId, quizId, answer })} />
              </div>
            )}
          </div>
        </div>
        {role === "teacher" && (
          <div className="flex items-center gap-3">
            <button onClick={toggleMute} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
              {muted ? "Unmute" : "Mute"}
            </button>
            <button onClick={toggleCamera} className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20">
              {cameraOff ? "Camera On" : "Camera Off"}
            </button>
            <button onClick={leaveClass} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">End Class</button>
          </div>
        )}
        {role !== "teacher" && (
          <div className="flex items-center gap-3">
            <button onClick={leaveClass} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">Leave</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helpers: simple creators and lists for polls/quizzes
function PollCreator({ onCreate }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("Yes,No");
  const create = (e) => {
    e.preventDefault();
    const opts = options.split(",").map((s) => s.trim()).filter(Boolean);
    if (!question || opts.length < 2) return;
    onCreate({ id: "poll-" + Date.now(), question, options: opts });
    setQuestion("");
    setOptions("Yes,No");
  };
  return (
    <form onSubmit={create} className="mb-3 flex gap-2">
      <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/10" placeholder="Poll question" value={question} onChange={(e)=>setQuestion(e.target.value)} />
      <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/10" placeholder="Comma separated options" value={options} onChange={(e)=>setOptions(e.target.value)} />
      <button className="px-3 py-2 rounded bg-cyan-600">Create</button>
    </form>
  );
}

function PollList({ polls, onVote }) {
  return (
    <div className="space-y-3">
      {polls.length === 0 && <div className="text-white/60 text-sm">No polls yet.</div>}
      {polls.map((p) => (
        <div key={p.id} className="p-3 rounded bg-white/10">
          <div className="font-semibold mb-2">{p.question}</div>
          <div className="flex flex-wrap gap-2">
            {p.options?.map((opt, idx) => (
              <button key={idx} onClick={() => onVote(p.id, opt)} className="px-3 py-1 rounded bg-white/15 hover:bg-white/25 text-sm">{opt}</button>
            ))}
          </div>
          {p.votes && (
            <div className="mt-2 text-xs text-white/70">Votes: {Object.keys(p.votes).length}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function QuizCreator({ onCreate }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const create = (e) => {
    e.preventDefault();
    if (!question || !answer) return;
    onCreate({ id: "quiz-" + Date.now(), question, correct: answer });
    setQuestion("");
    setAnswer("");
  };
  return (
    <form onSubmit={create} className="mb-3 flex gap-2">
      <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/10" placeholder="Quiz question" value={question} onChange={(e)=>setQuestion(e.target.value)} />
      <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/10" placeholder="Correct answer" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
      <button className="px-3 py-2 rounded bg-cyan-600">Create</button>
    </form>
  );
}

function QuizList({ quizzes, onAnswer }) {
  const [answers, setAnswers] = useState({});
  const submit = (quizId) => {
    const val = answers[quizId]?.trim();
    if (!val) return;
    onAnswer(quizId, val);
  };
  return (
    <div className="space-y-3">
      {quizzes.length === 0 && <div className="text-white/60 text-sm">No quizzes yet.</div>}
      {quizzes.map((q) => (
        <div key={q.id} className="p-3 rounded bg-white/10">
          <div className="font-semibold mb-2">{q.question}</div>
          <div className="flex gap-2">
            <input className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/10" placeholder="Your answer" value={answers[q.id] || ''} onChange={(e)=>setAnswers((prev)=>({...prev, [q.id]: e.target.value}))} />
            <button onClick={()=>submit(q.id)} className="px-3 py-2 rounded bg-cyan-600">Submit</button>
          </div>
          {q.answers && (
            <div className="mt-2 text-xs text-white/70">Responses: {Object.keys(q.answers).length}</div>
          )}
        </div>
      ))}
    </div>
  );
}
