/* eslint-disable react-refresh/only-export-components */
import React, { createContext } from "react";
import useSocket from "../hooks/useSocket.js";

// Create context
export const SocketContext = createContext(null);

// Provider component
export const SocketProvider = ({ children, username }) => {
  const socketState = useSocket({ username });

  return (
    <SocketContext.Provider value={socketState}>
      {children}
    </SocketContext.Provider>
  );
};

