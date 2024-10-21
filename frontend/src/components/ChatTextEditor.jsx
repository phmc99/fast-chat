import { useState } from "react";
import { Flex, Textarea, IconButton } from "@chakra-ui/react";
import { HiPaperAirplane } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { socket } from "../socket";

export default function ChatTextEditor() {
  const { user } = useAuth();

  const [text, setText] = useState("");

  let { chatId } = useParams();

  function sendMessage() {
    if (!text || text === "") return;

    const messageData = {
      text: text,
      chatId: chatId,
      userId: user?.id,
      user: {
        email: user?.email,
        nickname: user?.nickname,
      },
    };

    socket.emit("send_message", messageData, (response) => {});

    setText("");
  }

  return (
    <Flex
      bgColor={"gray.100"}
      h={"10vh"}
      p={2}
      align={"center"}
      justify={"center"}
      gap={2}
    >
      <Textarea
        bgColor={"white"}
        rows={2}
        placeholder="Digite sua mensagem aqui"
        onChange={(e) => setText(e.target.value)}
        value={text}
        maxLength={254}
      />
      <IconButton
        color={"blue.500"}
        aria-label="Enviar mensagem"
        icon={<HiPaperAirplane size={28} />}
        onClick={sendMessage}
      />
    </Flex>
  );
}
