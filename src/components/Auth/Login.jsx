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
  InputGroup,
  InputLeftElement,
  Text,
  Link,
  useToast,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import {
  HiUser,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiMail,
  HiPhone,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../app/Slices/userSlice";
import {
  loginUser,
  selectIsLoading,
  selectError,
  selectUser,
  selectIsLoggedIn,
} from "../../app/Slices/authSlice";

export default function Login({ isOpen, onClose, onOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn && location.pathname === "/account") {
      onOpen(); // Auto-open the modal when navigating to /account if not logged in
    }
  }, [location.pathname, isLoggedIn, onOpen]);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password }));
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

      if (response?.statusCode === 201) {
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

  if (isLoggedIn) {
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
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiUser color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </InputGroup>
              </FormControl>
            )}

            {isSignUp && (
              <FormControl id="phone" mb={4} isRequired>
                <FormLabel>Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <HiPhone color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </InputGroup>
              </FormControl>
            )}

            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <HiMail color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </InputGroup>
            </FormControl>

            <FormControl id="password" mb={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <HiLockClosed color="gray.300" />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  isDisabled={isLoading}
                />
                <InputRightElement>
                  <IconButton
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={
                      showPassword ? (
                        <HiEyeOff color="gray.500" />
                      ) : (
                        <HiEye color="gray.500" />
                      )
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    size="md"
                  />
                </InputRightElement>
              </InputGroup>
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
