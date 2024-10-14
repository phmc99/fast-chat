import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useQueryParams from "../hooks/useQueryParams";
import { socket } from "../socket";

export default function SignIn() {
  const { login, user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast();

  const navigate = useNavigate();
  let query = useQueryParams();

  async function onSubmit(values) {
    try {
      await login(values);

      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      socket.emit(
        "join_room",
        {
          chatId: query.get("chatId"),
          isObserver: false,
          nickname: user?.nickname,
        },
        (response) => {
          toast({
            title: response?.message,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      );

      navigate(`/${query.get("chatId")}`);
    } catch (error) {
      toast({
        title: "Erro ao realizar login",
        description: error.response?.data?.message || "Credenciais inválidas.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgColor={"gray.100"}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
        bgColor={"white"}
      >
        <Heading
          textAlign={"center"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          Entrar
        </Heading>
        <Text textAlign={"center"} fontSize={{ base: "sm", sm: "md" }}>
          Faça login para acessar sua conta
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="email" isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              {...register("email", {
                required: "Insira seu email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Insira um email válido",
                },
              })}
              placeholder="Seu email"
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="password" isInvalid={errors.password} mt={4}>
            <FormLabel>Senha</FormLabel>
            <Input
              type="password"
              {...register("password", {
                required: "Insira sua senha",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres",
                },
              })}
              placeholder="Sua senha"
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing={6} mt={4}>
            <Button
              isLoading={isSubmitting}
              type="submit"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
