import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket({ url = "http://localhost:5000", username } = {}) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typing, setTyping] = useState({});

  useEffect(() => {
    const socket = io(url, { autoConnect: false });
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("init", { username });
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("message:received", (msg) => setMessages(prev => [...prev, msg]));
    socket.on("presence:list", setUsers);
    socket.on("presence:update", (u) => {
      setUsers(prev => {
        const found = prev.find(p => p.id === u.id);
        if (found) return prev.map(p => p.id === u.id ? { ...p, ...u } : p);
        return [...prev, u];
      });
    });

    socket.on("typing", (t) => {
      setTyping(prev => ({ ...prev, [t.id]: t.isTyping }));
      if (t.isTyping) setTimeout(() => setTyping(prev => ({ ...prev, [t.id]: false })), 3000);
    });

    socket.connect();
    return () => socket.disconnect();
  }, [url, username]);

  const sendMessage = (payload) =>
    new Promise((resolve, reject) => {
      if (!socketRef.current?.connected) return reject(new Error("Socket not connected"));
      socketRef.current.emit("message:send", payload, (ack) => resolve(ack));
    });

  const emitTyping = (room, isTyping) => socketRef.current?.emit("typing", { room, isTyping });
  const joinRoom = (room) => socketRef.current?.emit("room:join", room);
  const leaveRoom = (room) => socketRef.current?.emit("room:leave", room);

  return { connected, messages, users, typing, sendMessage, emitTyping, joinRoom, leaveRoom };

}
