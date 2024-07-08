import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import Navbar from "../components/Navbar";
import Drawer from "../components/Drawer";
import Head from "next/head";
import Chat from "../components/Chat";
import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    setMessages([...messages, { text: newMessage, isUser: true }]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? "user" : "bot"}`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tulis pesan..."
        />
        <button onClick={handleSendMessage}>Kirim</button>
      </div>
    </div>
  );
};

export default Chat;
