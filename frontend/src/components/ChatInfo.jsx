import {
  Avatar,
  AvatarBadge,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

export default function ChatInfo({ onClose, isOpen, usersInRoom = [] }) {
  const { chatId } = useParams();

  return (
    <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Informações da Sala</DrawerHeader>
        <DrawerBody>
          <Stack align={"center"}>
            <Heading size={"lg"}>{chatId}</Heading>

            <Stack>
              <Text>Conectados: {usersInRoom.length}</Text>
              {usersInRoom.length > 0
                ? usersInRoom
                    .filter((e) => e.chatId === chatId)
                    .map((user) => (
                      <Flex key={user.nickname} alignItems={"center"} gap={4}>
                        <Avatar
                          alignSelf={"flex-start"}
                          mt={1}
                          size="sm"
                          name={user.nickname}
                          src="https://bit.ly/broken-link"
                          online
                        >
                          <AvatarBadge boxSize="1.25em" bg="green.500" />
                        </Avatar>
                        <Text fontWeight={"semibold"}>{user.nickname}</Text>
                      </Flex>
                    ))
                : null}
            </Stack>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
