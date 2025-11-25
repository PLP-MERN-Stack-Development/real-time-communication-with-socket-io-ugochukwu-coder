import handlePresence from "./presence.js";
import handleMessaging from "./messaging.js";

export default function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    socket.on("init", (payload) => {
      socket.data.username = payload?.username || `Guest-${socket.id.slice(0,5)}`;
      socket.join("global");
      socket.to("global").emit("user:joined", { id: socket.id, username: socket.data.username });

      // send current users list
      const users = [];
      for (const [id, s] of io.of("/").sockets) {
        users.push({ id, username: s.data.username || null, rooms: Array.from(s.rooms) });
      }
      socket.emit("presence:list", users);
    });

    handlePresence(io, socket);
    handleMessaging(io, socket);

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
      socket.to("global").emit("user:left", { id: socket.id, username: socket.data.username });
    });
  });
}
