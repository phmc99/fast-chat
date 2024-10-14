import { Flex, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import ChatMessageList from "../components/ChatMessageList";
import ChatTextEditor from "../components/ChatTextEditor";
import ChatHeader from "../components/ChatHeader";
import { useAuth } from "../context/AuthContext";
import ChatAuth from "../components/ChatAuth";
import UserInfo from "../components/UserInfo";
import { useParams } from "react-router-dom";
import ChatInfo from "../components/ChatInfo";

export default function Chat() {
  const { decodeToken, token } = useAuth();

  const { chatId } = useParams();

  const [usersInRoom, setUsersInRoom] = useState([]);

  const toast = useToast();

  useEffect(() => {
    socket.on("user_joined", (data) => {
      if (data.firstTime) {
        toast({
          title: `${data.nickname} entrou na sala.`,
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    });

    socket.on("users_in_room", (data) => {
      setUsersInRoom(data.users);
      if (data.disconnectedUser) {
        toast({
          title: `${data.disconnectedUser.nickname} saiu da sala.`,
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    });

    let tk = localStorage.getItem("token");
    const user = decodeToken(tk)?.user;

    if (usersInRoom.length === 0 && tk) {
      socket.emit(
        "join_room",
        {
          chatId: chatId,
          isObserver: false,
          nickname: user?.nickname,
        },
        (res) => {}
      );
    }

    return () => {
      socket.off("users_in_room");
      socket.off("user_joined");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isOpen: isOpenUserInfo,
    onOpen: onOpenUserInfo,
    onClose: onCloseUserInfo,
  } = useDisclosure();

  const {
    isOpen: isOpenChatInfo,
    onOpen: onOpenChatInfo,
    onClose: onCloseChatInfo,
  } = useDisclosure();

  return (
    <Stack w={"full"} spacing={0}>
      <UserInfo isOpen={isOpenUserInfo} onClose={onCloseUserInfo} />
      <ChatInfo
        isOpen={isOpenChatInfo}
        onClose={onCloseChatInfo}
        usersInRoom={usersInRoom}
      />
      <ChatHeader openUserInfo={onOpenUserInfo} openChatInfo={onOpenChatInfo} />
      <Flex>
        <Stack spacing={0} w={"full"}>
          <ChatMessageList />
          {token ? <ChatTextEditor /> : <ChatAuth />}
        </Stack>
      </Flex>
    </Stack>
  );
}
