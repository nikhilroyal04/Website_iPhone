import React, { useState, useEffect } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie-player";
import animationData from "../../assets/animations/Internet.json";

const NetworkError = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Check initial network status

  // Function to handle navigation to the home page
  const handleGoHome = () => {
    navigate("/");
  };

  useEffect(() => {
    // Event listeners for network status changes
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Add event listeners for online and offline events
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="90vh"
      mb={10}
    >
      {isOnline ? (
        // If online, show a message
        <VStack>
          <Text fontSize="2xl" mb={5}>
            You are back online!
          </Text>
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
            Go Home
          </Button>
        </VStack>
      ) : (
        // If offline, show the animation and error message
        <>
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: "60%", maxWidth: "600px", height: "auto" }}
          />
          <VStack mt={2}>
            <Text fontSize="2xl" color="red.500" mb={5}>
              You are offline. Check your connection.
            </Text>
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
              Go Home
            </Button>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default NetworkError;
