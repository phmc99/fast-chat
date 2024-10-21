import { Stack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import Message from "./Message";
import { useMessages } from "../context/MessagesContext";
import { useParams } from "react-router-dom";

export default function ChatMessageList() {
  const { user } = useAuth();
  const { chatId } = useParams();
  const { messages, fetchMessages } = useMessages();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages(chatId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMessages(chatId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Stack
      py={2}
      px={2}
      bgColor={"gray.500"}
      w={"full"}
      h={{ base: "82vh" }}
      overflow={"auto"}
      marginTop={"auto"}
    >
      {messages.map((msg) => (
        <Message
          key={msg.id}
          name={msg?.user?.nickname}
          msg={msg?.text}
          date={msg?.createdAt}
          isOwner={msg?.user?.nickname === user?.nickname}
        />
      ))}
      <div ref={messagesEndRef} />
    </Stack>
  );
}
