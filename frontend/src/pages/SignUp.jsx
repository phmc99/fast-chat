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

export default function SignUp() {
  const { register: registerAuth } = useAuth();

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
      registerAuth(values);

      toast({
        title: "Conta criada com sucesso!",
        description: "Você foi registrado e está logado.",
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
          nickname: values.nickname,
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
        title: "Erro ao criar conta",
        description: error.response?.data?.message || "Algo deu errado.",
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
          Criar Conta
        </Heading>
        <Text textAlign={"center"} fontSize={{ base: "sm", sm: "md" }}>
          Preencha os campos abaixo para criar sua conta
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

          <FormControl id="nickname" isInvalid={errors.nickname} mt={4}>
            <FormLabel>Apelido</FormLabel>
            <Input
              {...register("nickname", {
                required: "Insira seu apelido",
                minLength: {
                  value: 4,
                  message: "O apelido deve ter no mínimo 4 caracteres",
                },
              })}
              placeholder="Seu apelido"
            />
            <FormErrorMessage>
              {errors.nickname && errors.nickname.message}
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
              Criar Conta
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
