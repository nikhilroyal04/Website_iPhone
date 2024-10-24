import React from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import animationData from "../../assets/animations/NotFound.json";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="90vh"
      mb={10}
    >
      {/* Lottie Animation */}
      <Lottie
        loop
        animationData={animationData}
        play
        style={{ width: "60%", maxWidth: "300px", height: "auto" }}
      />

      <VStack mt={2}>
        <Text color="red" fontSize="xl">Page not found</Text>
        <Button
          size="lg"
          onClick={handleGoHome}
          px={10}
          py={6}
          fontSize="lg"
          borderRadius="lg"
          _hover={{
            bg: "teal.100",
            transform: "scale(1.1)",
            transition: "all 0.3s ease-in-out",
          }}
          _active={{
            bg: "teal.100",
            transform: "scale(0.9)",
          }}
          _focus={{
            boxShadow: "outline",
          }}
          transition="all 0.2s ease-in-out"
        >
          Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;
