import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { useAuth } from "../context/AuthContext";

export default function IndexForm() {
  const { decodeToken } = useAuth();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const toast = useToast();

  const token = localStorage.getItem("token");
  const nicknameFromToken = token ? decodeToken(token)?.user.nickname : null;

  if (nicknameFromToken) {
    setValue("nickname", nicknameFromToken);
  }

  function joinChat(values) {
    localStorage.setItem("observerNickname", values.nickname);

    socket.emit(
      "join_room",
      {
        chatId: values.chatId,
        isObserver: nicknameFromToken ? false : true,
        nickname: values.nickname,
        firstTime: true,
      },
      (response) => {
        toast({
          title: response?.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        navigate(`/${values.chatId}`);
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(joinChat)}>
      <FormControl id="nickname" isInvalid={errors.nickname}>
        <FormLabel htmlFor="nickname">Apelido</FormLabel>
        <Input
          {...register("nickname", {
            required: "Insira um apelido",
            minLength: {
              value: 4,
              message: "O apelido tem que ter no mínimo 4 caracteres",
            },
          })}
          placeholder="Como gostaria de ser chamado?"
          isDisabled={!!nicknameFromToken}
        />
        <FormErrorMessage>
          {errors.nickname && errors.nickname.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl id="chatId" isInvalid={errors.chatId}>
        <FormLabel htmlFor="chatId">ID do Chat</FormLabel>
        <Input
          {...register("chatId", {
            required: "Insira o ID do Chat",
            minLength: {
              value: 2,
              message: "O ID tem que ter no mínimo 2 caracteres",
            },
            validate: {
              isAlphanumeric: (value) => {
                const regex = /^[a-zA-Z0-9]*$/;
                return (
                  regex.test(value) ||
                  "O ID deve conter apenas letras e números."
                );
              },
              noSpaces: (value) => {
                return !/\s/.test(value) || "O ID não deve conter espaços.";
              },
            },
          })}
          placeholder="Digite o ID do Chat"
        />
        <FormErrorMessage>
          {errors.chatId && errors.chatId.message}
        </FormErrorMessage>
        <FormHelperText>
          Os IDs devem ser mais ou menos assim: /IdDoChat ou IdDoChat
        </FormHelperText>
      </FormControl>
      <Stack spacing={6}>
        <Button
          isLoading={isSubmitting}
          type="submit"
          bg={"blue.400"}
          color={"white"}
          mt={4}
          _hover={{
            bg: "blue.500",
          }}
        >
          Entrar no Chat
        </Button>
      </Stack>
    </form>
  );
}
