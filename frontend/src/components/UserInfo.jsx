import {
  Button,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import ChatAuth from "./ChatAuth";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../socket";

export default function UserInfo({ onClose, isOpen }) {
  const { user, logout } = useAuth();

  const [nickname, setNickname] = useState(
    user?.nickname || localStorage.getItem("observerNickname")
  );

  const toast = useToast();

  const { token } = useAuth();

  const navigate = useNavigate();

  const { chatId } = useParams();

  function endSession() {
    logout();
    toast({
      title: "Você foi desconectado!",
      description: "Até a próxima conversa.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    onClose();
  }

  function changeRoom() {
    socket.emit("forceDisconnect", { chatId });
    navigate(`/`);
  }

  useEffect(() => {
    setNickname(user?.nickname || localStorage.getItem("observerNickname"));
  }, [user]);

  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justify={"space-between"}>
            <Heading size={"md"} fontWeight={"semibold"}>
              Suas Informações{" "}
            </Heading>
            <CloseButton onClick={onClose} />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Stack align={"center"}>
            <Heading size={"lg"}>Olá, {nickname}!</Heading>
            <Divider />

            <Stack w={"full"} align={"center"}>
              <Text>Quer entrar em outra conversa?</Text>
              <Button
                variant={"ghost"}
                w={"full"}
                onClick={changeRoom}
                colorScheme="blue"
              >
                Mudar de Sala
              </Button>
            </Stack>

            <Divider />
            {token ? (
              <Button variant={"link"} colorScheme="red" onClick={endSession}>
                Logout
              </Button>
            ) : (
              <ChatAuth removeBg />
            )}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
