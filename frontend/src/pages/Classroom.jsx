import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { Video, VideoOff, Mic, MicOff, Phone, Users, MessageCircle, BarChart3, Brain } from "lucide-react";

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
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [polls, setPolls] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [participantCount, setParticipantCount] = useState(role === "teacher" ? 1 : 0);

  useEffect(() => {
    const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    pcRef.current = new RTCPeerConnection(config);

    if (role === "student") {
      pcRef.current.addTransceiver("video", { direction: "recvonly" });
      pcRef.current.addTransceiver("audio", { direction: "recvonly" });
    }

    pcRef.current.onicecandidate = (e) => {
      if (e.candidate && connectedPeerId) {
        socket.emit("webrtc:ice-candidate", { to: connectedPeerId, candidate: e.candidate });
      }
    };

    pcRef.current.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current && stream) {
        remoteVideoRef.current.srcObject = stream;
        setStatus("Connected - Receiving video");
      }
    };

    pcRef.current.onconnectionstatechange = () => {
      const state = pcRef.current.connectionState;
      if (state === "connected") setStatus("Connected!");
      else if (state === "failed") setStatus("Connection failed");
      else if (state === "disconnected") setStatus("Disconnected");
    };

    const initMedia = async () => {
      if (role !== "teacher") return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
        setStatus("Camera ready");
      } catch (err) {
        setStatus("Failed to access camera/microphone");
      }
    };

    initMedia().then(() => {
      if (role === "teacher") {
        socket.emit("room:create", { roomId });
      } else {
        socket.emit("room:join", { roomId });
      }
    });

    // Socket events
    socket.on("room:created", () => {
      setStatus("Classroom ready");
      if (role === "teacher" && !timerRef.current) {
        timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
      }
    });

    socket.on("room:joined", ({ hostId }) => {
      setConnectedPeerId(hostId);
      setStatus("Connected to teacher");
      setParticipantCount(prev => prev + 1);
    });

    socket.on("room:ended", () => {
      setStatus("Class ended");
      if (role !== "teacher") navigate("/studentDashboard");
    });

    socket.on("peer:join", async ({ studentId }) => {
      if (role !== "teacher") return;
      setConnectedPeerId(studentId);
      setParticipantCount(prev => prev + 1);
      try {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        socket.emit("webrtc:offer", { to: studentId, sdp: offer });
        setStatus("Student connected");
      } catch (err) {
        console.error("Offer error:", err);
      }
    });

    socket.on("webrtc:offer", async ({ from, sdp }) => {
      if (role !== "student") return;
      setConnectedPeerId(from);
      try {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);
        socket.emit("webrtc:answer", { to: from, sdp: answer });
        setStatus("Connecting to video...");
      } catch (err) {
        console.error("Answer error:", err);
      }
    });

    socket.on("webrtc:answer", async ({ sdp }) => {
      if (role !== "teacher") return;
      try {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
        setStatus("Student connected successfully!");
      } catch (err) {
        console.error("Answer handling error:", err);
      }
    });

    socket.on("webrtc:ice-candidate", async ({ candidate }) => {
      try {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        console.error("ICE error:", err);
      }
    });

    // Chat, polls, quiz events
    socket.on("chat:new", msg => setMessages(prev => [...prev, msg]));
    socket.on("poll:new", poll => setPolls(prev => [poll, ...prev.filter(p => p.id !== poll.id)]));
    socket.on("poll:update", ({ pollId, votes }) => setPolls(prev => prev.map(p => p.id === pollId ? { ...p, votes } : p)));
    socket.on("quiz:new", quiz => setQuizzes(prev => [quiz, ...prev.filter(q => q.id !== quiz.id)]));
    socket.on("quiz:update", ({ quizId, answers }) => setQuizzes(prev => prev.map(q => q.id === quizId ? { ...q, answers } : q)));
    socket.on("participant:count", ({ count }) => setParticipantCount(count));

    return () => {
      socket.disconnect();
      pcRef.current?.close();
      localStreamRef.current?.getTracks().forEach(track => track.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [roomId, role]);

  const toggleMute = () => {
    if (role !== "teacher") return;
    const audioTracks = localStreamRef.current?.getAudioTracks();
    if (audioTracks?.[0]) {
      audioTracks[0].enabled = !audioTracks[0].enabled;
      setMuted(!audioTracks[0].enabled);
    }
  };

  const toggleCamera = () => {
    if (role !== "teacher") return;
    const videoTracks = localStreamRef.current?.getVideoTracks();
    if (videoTracks?.[0]) {
      videoTracks[0].enabled = !videoTracks[0].enabled;
      setCameraOff(!videoTracks[0].enabled);
    }
  };

  const endClass = () => {
    if (role === "teacher") socket.emit("room:end", { roomId });
    navigate(-1);
  };

  const sendMessage = (e) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const sender = { id: socket.id, role, name: role === "teacher" ? "Teacher" : "Student" };
    socket.emit("chat:send", { roomId, text, sender });
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white p-4">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur rounded-xl p-4 mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Live Classroom</h1>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded">
            <Users className="w-4 h-4" />
            {participantCount}
          </div>
          <span>Room: {roomId}</span>
          <span className={`px-2 py-1 rounded ${role === "teacher" ? "bg-purple-500/30" : "bg-cyan-500/30"}`}>
            {role}
          </span>
          {role === "teacher" && (
            <span className="font-mono">{Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, "0")}</span>
          )}
        </div>
      </div>

      <div className="text-cyan-400 mb-4">{status}</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Video */}
        <div className="lg:col-span-2 bg-black rounded-xl overflow-hidden aspect-video relative">
          {role === "teacher" ? (
            <>
              <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              {cameraOff && <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <VideoOff className="w-16 h-16 text-gray-400" />
              </div>}
            </>
          ) : (
            <>
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
              {!remoteVideoRef.current?.srcObject && (
                <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p>Waiting for video...</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Video Controls */}
          {role === "teacher" && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              <button onClick={toggleMute} className={`p-2 rounded-full backdrop-blur ${muted ? "bg-red-500/30" : "bg-white/20"}`}>
                {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <button onClick={toggleCamera} className={`p-2 rounded-full backdrop-blur ${cameraOff ? "bg-red-500/30" : "bg-white/20"}`}>
                {cameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="bg-white/5 rounded-xl border border-white/10 flex flex-col h-96">
          {/* Tabs */}
          <div className="p-3 border-b border-white/10 flex gap-1">
            <button onClick={() => setActiveTab("chat")} className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${activeTab === "chat" ? "bg-cyan-500/30" : "bg-white/10"}`}>
              <MessageCircle className="w-4 h-4" /> Chat
            </button>
            <button onClick={() => setActiveTab("polls")} className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${activeTab === "polls" ? "bg-purple-500/30" : "bg-white/10"}`}>
              <BarChart3 className="w-4 h-4" /> Poll
            </button>
            <button onClick={() => setActiveTab("quizzes")} className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${activeTab === "quizzes" ? "bg-green-500/30" : "bg-white/10"}`}>
              <Brain className="w-4 h-4" /> Quiz
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeTab === "chat" && (
              <>
                <div className="flex-1 p-3 overflow-auto space-y-2">
                  {messages.map(m => (
                    <div key={m.id} className="text-xs">
                      <span className="text-cyan-400">[{new Date(m.ts).toLocaleTimeString()}] </span>
                      <span className="font-medium">{m.sender?.role === "teacher" ? "Teacher" : "Student"}: </span>
                      <span>{m.text}</span>
                    </div>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="p-3 border-t border-white/10 flex gap-2">
                  <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type message..." className="flex-1 px-2 py-1 bg-white/10 rounded border border-white/10 text-sm" />
                  <button type="submit" className="px-3 py-1 bg-cyan-500 rounded text-sm">Send</button>
                </form>
              </>
            )}

            {activeTab === "polls" && (
              <div className="flex-1 p-3 overflow-auto">
                {role === "teacher" && <PollCreator onCreate={poll => socket.emit('poll:create', { roomId, poll })} />}
                <PollList polls={polls} onVote={(pollId, choice) => socket.emit('poll:vote', { roomId, pollId, choice })} />
              </div>
            )}

            {activeTab === "quizzes" && (
              <div className="flex-1 p-3 overflow-auto">
                {role === "teacher" && <QuizCreator onCreate={quiz => socket.emit('quiz:create', { roomId, quiz })} />}
                <QuizList quizzes={quizzes} onAnswer={(quizId, answer) => socket.emit('quiz:answer', { roomId, quizId, answer })} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center">
        <button onClick={endClass} className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2 transition-all">
          <Phone className="w-4 h-4" />
          {role === "teacher" ? "End Class" : "Leave"}
        </button>
      </div>
    </div>
  );
}

// Helper Components
function PollCreator({ onCreate }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("Yes,No");
  
  const create = (e) => {
    e.preventDefault();
    const opts = options.split(",").map(s => s.trim()).filter(Boolean);
    if (!question || opts.length < 2) return;
    onCreate({ id: "poll-" + Date.now(), question, options: opts });
    setQuestion("");
    setOptions("Yes,No");
  };
  
  return (
    <form onSubmit={create} className="mb-3 space-y-2">
      <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Poll question" className="w-full px-2 py-1 bg-white/10 rounded text-sm" />
      <input value={options} onChange={e => setOptions(e.target.value)} placeholder="Options (comma separated)" className="w-full px-2 py-1 bg-white/10 rounded text-sm" />
      <button className="w-full py-1 bg-purple-500 rounded text-sm">Create</button>
    </form>
  );
}

function PollList({ polls, onVote }) {
  return (
    <div className="space-y-2">
      {polls.map(p => (
        <div key={p.id} className="p-2 bg-white/10 rounded">
          <div className="text-sm font-medium mb-2">{p.question}</div>
          <div className="grid gap-1">
            {p.options?.map((opt, idx) => (
              <button key={idx} onClick={() => onVote(p.id, opt)} className="px-2 py-1 bg-white/10 hover:bg-purple-500/30 rounded text-xs">{opt}</button>
            ))}
          </div>
          {p.votes && <div className="text-xs text-white/60 mt-2">Votes: {Object.keys(p.votes).length}</div>}
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
    <form onSubmit={create} className="mb-3 space-y-2">
      <input value={question} onChange={e => setQuestion(e.target.value)} placeholder="Quiz question" className="w-full px-2 py-1 bg-white/10 rounded text-sm" />
      <input value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Correct answer" className="w-full px-2 py-1 bg-white/10 rounded text-sm" />
      <button className="w-full py-1 bg-green-500 rounded text-sm">Create</button>
    </form>
  );
}

function QuizList({ quizzes, onAnswer }) {
  const [answers, setAnswers] = useState({});
  
  const submit = (quizId) => {
    const val = answers[quizId]?.trim();
    if (!val) return;
    onAnswer(quizId, val);
    setAnswers(prev => ({ ...prev, [quizId]: '' }));
  };
  
  return (
    <div className="space-y-2">
      {quizzes.map(q => (
        <div key={q.id} className="p-2 bg-white/10 rounded">
          <div className="text-sm font-medium mb-2">{q.question}</div>
          <div className="flex gap-2">
            <input value={answers[q.id] || ''} onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))} placeholder="Answer" className="flex-1 px-2 py-1 bg-white/10 rounded text-xs" />
            <button onClick={() => submit(q.id)} className="px-2 py-1 bg-green-500 rounded text-xs">Submit</button>
          </div>
          {q.answers && <div className="text-xs text-white/60 mt-2">Responses: {Object.keys(q.answers).length}</div>}
        </div>
      ))}
    </div>
  );
}