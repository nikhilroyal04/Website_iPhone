import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

export default function ThankYou() {
  return (
    <Box 
      p={6} 
      mt={14} 
      minHeight="50vh" 
      width="80vw" 
      bg="white" 
      borderRadius="md" 
      boxShadow="lg" 
      textAlign="center"
    >
      <VStack spacing={4}>
        <Icon as={CheckCircleIcon} boxSize={12} color="green.500" />
        <Heading as="h2" size="xl" color="blue.600">
          Thank You for Your Purchase!
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Your order has been successfully placed. We appreciate your business!
        </Text>
        <Button 
          colorScheme="blue" 
          size="lg" 
          onClick={() => window.location.href = '/'} // Redirect to home page
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
}
