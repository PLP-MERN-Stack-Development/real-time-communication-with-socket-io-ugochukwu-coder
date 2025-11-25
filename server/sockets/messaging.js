export default function handleMessaging(io, socket) {
  socket.on("message:send", (payload, ack) => {
    const message = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2,9)}`,
      room: payload.room || "global",
      from: { id: socket.id, username: socket.data.username },
      to: payload.toUserId || null,
      content: payload.content,
      createdAt: new Date().toISOString()
    };

    if (message.to) {
      io.to(message.to).emit("message:received", message);
      socket.emit("message:sent", message);
    } else {
      io.to(message.room).emit("message:received", message);
    }

    if (typeof ack === "function") ack({ ok: true, id: message.id, timestamp: message.createdAt });
  });

  socket.on("typing", (payload) => {
    socket.to(payload.room || "global").emit("typing", { id: socket.id, username: socket.data.username, isTyping: payload.isTyping });
  });

  socket.on("room:join", (room, ack) => {
    socket.join(room);
    socket.to(room).emit("room:user:joined", { id: socket.id, username: socket.data.username, room });
    if (ack) ack({ ok: true });
  });

  socket.on("room:leave", (room, ack) => {
    socket.leave(room);
    socket.to(room).emit("room:user:left", { id: socket.id, username: socket.data.username, room });
    if (ack) ack({ ok: true });
  });

  socket.on("message:read", (msg) => {
    io.to(msg.room || "global").emit("message:read", { id: msg.id, by: socket.id, at: new Date().toISOString() });
  });
}
