import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import axios from "axios";

const MessagesContext = createContext();
const envUrl = process.env.REACT_APP_API_URL;
const baseUrl = envUrl ? envUrl + "/api" : "http://localhost:3001/api";

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => {
      const existingMessageIds = prevMessages.map((msg) => msg.id);
      if (!existingMessageIds.includes(newMessage.id)) {
        return [...prevMessages, newMessage];
      }
      return prevMessages;
    });
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`${baseUrl}/message/chat/${chatId}`);
      const newMessages = response.data;

      setMessages(newMessages);
    } catch (error) {
      console.error("Erro ao carregar mensagens:", error);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages(data);
    });

    return () => {};
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, fetchMessages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessagesContext);
};
