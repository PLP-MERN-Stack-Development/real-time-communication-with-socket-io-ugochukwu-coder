Real-Time Chat Application with Socket.io
🚀 Project Overview

This is a real-time chat application built with React (Vite), Node.js, Express, and Socket.io. It demonstrates bidirectional communication between clients and the server, featuring live messaging, typing indicators, online status, and more.

Users can join a global chat room, send messages, see online users, and experience real-time updates.

📂 Features
Core Features

Real-time messaging with Socket.io

Global chat room for all users

Display of online users

Typing indicators

Live message updates

Advanced Features

Multiple rooms support

Private messaging between users

Message read acknowledgments

User presence tracking

Message delivery acknowledgment

🛠 Tech Stack

Frontend: React, Vite, Socket.io-client

Backend: Node.js, Express, Socket.io

Realtime Communication: WebSockets via Socket.io

State Management: React Context + Hooks

Styling: Minimal CSS (can be extended with Tailwind or other UI frameworks)

📁 Folder Structure
chat-app/
  server/
    package.json
    src/
      index.js
      sockets/
        index.js
        messaging.js
        presence.js
  client/
    package.json
    vite.config.js
    src/
      main.jsx
      App.jsx
      context/
        SocketContext.jsx
        SocketProvider.jsx
      hooks/
        useSocket.js
      pages/
        ChatRoom.jsx
      components/
        MessageList.jsx
        MessageInput.jsx
        OnlineList.jsx

⚡ Setup & Installation
1️⃣ Server
cd server
npm install
npm run dev


Runs the server on http://localhost:5000

Express serves as backend API and Socket.io server

2️⃣ Client
cd client
npm install
npm run dev


Runs React front-end on http://localhost:5173

Connects to Socket.io server for real-time communication

📝 Usage

Open the client app in your browser.

Enter your username when prompted.

Send messages in the global chat.

See online users and typing indicators.

Multiple clients can connect to test real-time updates.

🔧 Socket.io Events
Client → Server

init → initialize username

message:send → send a message

typing → user is typing

room:join / room:leave → join or leave a room

Server → Client

message:received → receive a message

user:joined / user:left → user presence notifications

presence:list → list of online users

typing → typing indicator updates

💡 Notes

Username is currently prompted on page load (can be replaced with auth).

The global chat room is always active.

Messages and users exist only in memory (no database persistence yet).

For production, you can integrate MongoDB to save messages and support multiple rooms.

📌 To-Do / Future Improvements

Add user authentication (JWT)

Persist messages in a database

Support private messaging

Improve UI/UX with Tailwind or Material UI

Implement multiple chat rooms

Add file/image sharing

Add notifications (sound/browser)

📜 License

This project is open-source under the MIT License.