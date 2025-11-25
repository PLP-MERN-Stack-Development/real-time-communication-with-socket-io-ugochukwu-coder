import React, { useState, useRef } from "react";

export default function MessageInput({ onSend, onTyping }) {
  const [text, setText] = useState("");
  const typingRef = useRef(false);
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    if (!typingRef.current) { onTyping(true); typingRef.current = true; }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => { onTyping(false); typingRef.current = false; }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText(""); onTyping(false); typingRef.current = false; clearTimeout(timeoutRef.current);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 8 }}>
      <input value={text} onChange={handleChange} placeholder="Type a message..." style={{ width: "80%" }} />
      <button type="submit">Send</button>
    </form>
  );
}
