import React from "react";

export default function OnlineList({ users = [] }) {
  return (
    <div>
      <h3>Online</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(u => <li key={u.id}><strong>{u.username || "Unknown"}</strong></li>)}
      </ul>
    </div>
  );
}
