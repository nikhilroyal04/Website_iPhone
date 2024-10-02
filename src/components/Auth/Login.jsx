import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  selectIsLoading,
  selectError,
  selectUser,
  logout,
  isTokenExpired,
} from "../../app/Slices/authSlice";
import { addUser } from "../../app/Slices/userSlice";

export default function AuthModal({ isOpen, onClose, onOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const toast = useToast();
  const tokenExpired = useSelector(isTokenExpired);

  useEffect(() => {
    if (tokenExpired) {
      dispatch(logout());
    }
    if (location.pathname === "/account" && !user) {
      onOpen(); // Auto-open the modal when navigating to /account if not logged in
    }
  }, [location.pathname, user, tokenExpired, onOpen, dispatch]);

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginUser(email, password));

      if (response && response.data) {
        navigate("/account");
        onClose();
      } else {
        toast({
          title: "Invalid Credentials",
          description: "Login failed, please check email and password.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Login Failed",
        description: error || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = async () => {
    try {
      const userData = {
        name,
        email,
        password,
        phoneNumber: phone,
        role: "User",
        status: "Active",
      };

      const response = await dispatch(addUser(userData));

      // Check if the signup was successful
      if (response && response.statusCode === 201) {
        toast({
          title: "Sign Up Successful",
          description: "Now you can login.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Clear fields
        setEmail("");
        setPassword("");
        setName("");
        setPhone("");

        // Switch to login view
        setIsSignUp(false);
      } else {
        toast({
          title: "Sign Up Failed",
          description: "Unexpected response received.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Sign Up Error:", err); // Log the error
      toast({
        title: "Sign Up Failed",
        description: error || "An unexpected error occurred during signup.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  const toggleModal = () => {
    setIsSignUp((prev) => !prev);
    setEmail("");
    setPassword(""); // Clear password on toggle
    setName(""); // Clear name on toggle
    setPhone(""); // Clear phone on toggle
  };

  if (user) {
    return null; // Do not render modal if user is logged in
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="lg">
        <ModalHeader textAlign="center" fontSize="2xl">
          {isSignUp ? "Sign Up" : "Login"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <FormControl id="name" mb={4} isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  isDisabled={isLoading}
                />
              </FormControl>
            )}

            {isSignUp && (
              <FormControl id="phone" mb={4} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  isDisabled={isLoading}
                />
              </FormControl>
            )}

            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                isDisabled={isLoading}
              />
            </FormControl>

            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                isDisabled={isLoading}
              />
            </FormControl>

            {!isSignUp && (
              <Text mt={2} textAlign="start" mb={3}>
                <Link color="green.500" href="#">
                  Forgot Password?
                </Link>
              </Text>
            )}

            <Button
              width="100%"
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
              mb={4}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </Button>

            <Text mt={4} textAlign="center" mb={4}>
              <Link color="blue.500" href="#" onClick={toggleModal}>
                {isSignUp
                  ? "Already have an account? Log in"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Text>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
