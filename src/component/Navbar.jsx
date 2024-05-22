import { useNavigate } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <Flex gap={3}>
      <Box
        onClick={() => navigate("/")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.100" }}
      >
        Home
      </Box>
      <Box
        onClick={() => navigate("/write")}
        cursor={"pointer"}
        _hover={{ bgColor: "gray.200" }}
      >
        글쓰기
      </Box>
    </Flex>
  );
}
