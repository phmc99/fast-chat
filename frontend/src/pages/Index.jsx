import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import IndexForm from "../components/IndexForm";

export default function Index() {
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
          Bem-Vindo ao Fast Chat!
        </Heading>
        <Text textAlign={"center"} fontSize={{ base: "sm", sm: "md" }}>
          Entre em diversas salas e converse sobre tudo.
        </Text>
        <IndexForm />
      </Stack>
    </Flex>
  );
}
