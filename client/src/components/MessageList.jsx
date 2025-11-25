import React from "react";

export default function MessageList({ messages = [] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {messages.map(m => (
        <li key={m.id || `${m.from?.id}-${m.createdAt}`} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: "#666" }}>{m.from?.username} • {new Date(m.createdAt).toLocaleTimeString()}</div>
          <div>{m.content}</div>
        </li>
      ))}
    </ul>
  );
}
