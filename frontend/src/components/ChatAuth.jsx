import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export default function ChatAuth({ removeBg = false }) {
  const navigate = useNavigate();
  const { chatId } = useParams();

  return (
    <Stack
      bgColor={removeBg ? "transparent" : "gray.200"}
      h={"10vh"}
      align={"center"}
    >
      <Text mt={2}>Para enviar mensagens</Text>
      <Flex justify={"center"} gap={4}>
        <Button
          onClick={() => navigate(`/auth/signin?chatId=${chatId}`)}
          variant={"link"}
          colorScheme="blue"
        >
          Faça login
        </Button>
        <Text>ou</Text>
        <Button
          onClick={() => navigate(`/auth/signup?chatId=${chatId}`)}
          variant={"link"}
          colorScheme="blue"
        >
          Cadastre-se
        </Button>
      </Flex>
    </Stack>
  );
}
