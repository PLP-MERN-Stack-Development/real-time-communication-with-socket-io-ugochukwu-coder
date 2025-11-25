export default function handlePresence(io, socket) {
  socket.on("presence:set", (status) => {
    socket.data.online = status.online;
    socket.to("global").emit("presence:update", { id: socket.id, username: socket.data.username, online: status.online });
  });

  socket.on("presence:get", () => {
    const users = [];
    for (const [id, s] of io.of("/").sockets) {
      users.push({ id, username: s.data.username || null, online: s.data.online ?? true });
    }
    socket.emit("presence:list", users);
  });
}
