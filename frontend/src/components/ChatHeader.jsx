import { Flex, IconButton } from "@chakra-ui/react";
import { HiChat, HiUser } from "react-icons/hi";

export default function ChatHeader({ openUserInfo, openChatInfo }) {
  return (
    <Flex
      w={"full"}
      bgColor={"gray.100"}
      px={2}
      py={4}
      justifyContent={"space-between"}
      h={"8vh"}
      shadow={"md"}
      borderBottom={"1px"}
      borderColor={"gray.300"}
    >
      <IconButton
        color={"blue.500"}
        aria-label="Minhas informações"
        icon={<HiUser size={22} />}
        onClick={openUserInfo}
      />
      <IconButton
        color={"blue.500"}
        aria-label="Informações do Chat"
        icon={<HiChat size={22} />}
        onClick={openChatInfo}
      />
    </Flex>
  );
}
