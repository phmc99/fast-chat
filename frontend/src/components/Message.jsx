import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";

export default function Message({ name, msg, isOwner }) {
  return (
    <Flex
      alignSelf={isOwner ? "flex-end" : "flex-start"}
      alignItems={"center"}
      bgColor={isOwner ? "blue.100" : "gray.200"}
      w={{ base: "90%" }}
      maxW={{ base: "370px" }}
      gap={4}
      px={2}
      py={2}
      borderRadius={"md"}
      boxShadow={"md"}
    >
      <Avatar
        alignSelf={"flex-start"}
        mt={1}
        size="sm"
        name={name}
        src="https://bit.ly/broken-link"
      />
      <Stack spacing={1} lineHeight={5}>
        <Text fontWeight={"semibold"} textTransform={"capitalize"}>
          {name}
        </Text>
        <Text fontSize={{ base: "md" }}>{msg}</Text>
      </Stack>
    </Flex>
  );
}
