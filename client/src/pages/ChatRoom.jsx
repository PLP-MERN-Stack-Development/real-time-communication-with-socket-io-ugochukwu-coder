import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketProvider.jsx";
import MessageList from "../components/MessageList.jsx";
import MessageInput from "../components/MessageInput.jsx";
import OnlineList from "../components/OnlineList.jsx";

export default function ChatRoom() {
  const { connected, messages, sendMessage, typing, users, emitTyping } = useContext(SocketContext);
  const [room] = useState("global");

  const handleSend = async (text) => {
    try { await sendMessage({ room, content: text }); } catch (err) { console.error(err); }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 12 }}>
      <div>
        <h2>Global Chat {connected ? "(online)" : "(offline)"}</h2>
        <MessageList messages={messages} />
        {Object.entries(typing).map(([id, t]) => t ? <div key={id}>{id} is typing...</div> : null)}
        <MessageInput onSend={handleSend} onTyping={(isT) => emitTyping(room, isT)} />
      </div>
      <aside>
        <OnlineList users={users} />
      </aside>
    </div>
  );
}
