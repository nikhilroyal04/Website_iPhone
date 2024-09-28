import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSignUp = () => {
    // Handle sign up logic here
    console.log("Sign Up with:", { name, email, password, phone });
  };

  return (
    <Box
      w={{ base: "90%", md: "400px" }}
      p={6}
      mx="auto"
      mt={8}
      boxShadow="lg"
      borderRadius="lg"
      bg="white"
    >
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        Sign Up
      </Text>

      {/* Name Field */}
      <FormControl id="name" mb={4} isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </FormControl>

      {/* Email Field */}
      <FormControl id="email" mb={4} isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </FormControl>

      {/* Password Field */}
      <FormControl id="password" mb={4} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </FormControl>

      {/* Phone Number Field */}
      <FormControl id="phone" mb={4} isRequired>
        <FormLabel>Phone Number</FormLabel>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />
      </FormControl>

      {/* Sign Up Button */}
      <Button width="100%" colorScheme="blue" onClick={handleSignUp}>
        Sign Up
      </Button>

      {/* Already have an account? */}
      <Text mt={4} textAlign="center">
        Already have an account?{" "}
        <Link color="blue.500" href="#">
          Log in
        </Link>
      </Text>
    </Box>
  );
}
