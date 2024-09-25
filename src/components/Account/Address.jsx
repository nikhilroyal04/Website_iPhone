import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Select,
  FormErrorMessage,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", 
  "Delhi", "Puducherry"
];

export default function Address({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const isEmailValid = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const isMobileValid = mobile.match(/^\d{10}$/);
  const isPincodeValid = pincode.match(/^\d{6}$/);

  const canSave = 
    name && 
    mobile && isMobileValid && 
    email && isEmailValid && 
    address && 
    locality && 
    landmark && 
    pincode && isPincodeValid && 
    city && state;

  const handleSave = () => {
    // Add save logic here (e.g., API call)
    // Clear all fields
    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
    setLocality("");
    setLandmark("");
    setPincode("");
    setCity("");
    setState("");
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
      <ModalOverlay />
      <ModalContent
        maxHeight="90vh"
        overflowY="auto"
        sx={{
          "::-webkit-scrollbar": {
            width: "6px",
            borderRadius: "20px",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "0",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <ModalHeader>
          Add New Address
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={onClose}
            position="absolute"
            right="8px"
            top="8px"
            variant="link"
          />
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input 
                placeholder="Enter your name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired isInvalid={!isMobileValid && mobile.length > 0}>
                <FormLabel>Mobile</FormLabel>
                <Input 
                  placeholder="Enter your mobile number" 
                  value={mobile} 
                  onChange={(e) => setMobile(e.target.value)} 
                />
                {!isMobileValid && mobile.length > 0 && (
                  <FormErrorMessage>Invalid mobile number</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={!isEmailValid && email.length > 0}>
                <FormLabel>Email</FormLabel>
                <Input 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                {!isEmailValid && email.length > 0 && (
                  <FormErrorMessage>Invalid email address</FormErrorMessage>
                )}
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input 
                placeholder="Enter your address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Locality</FormLabel>
                <Input 
                  placeholder="Enter locality" 
                  value={locality} 
                  onChange={(e) => setLocality(e.target.value)} 
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Landmark</FormLabel>
                <Input 
                  placeholder="Enter landmark" 
                  value={landmark} 
                  onChange={(e) => setLandmark(e.target.value)} 
                />
              </FormControl>
            </HStack>

            <HStack spacing={4}>
              <FormControl isRequired isInvalid={!isPincodeValid && pincode.length > 0}>
                <FormLabel>Pincode</FormLabel>
                <Input 
                  placeholder="Enter pincode" 
                  value={pincode} 
                  onChange={(e) => setPincode(e.target.value)} 
                />
                {!isPincodeValid && pincode.length > 0 && (
                  <FormErrorMessage>Pincode must be 6 digits</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input 
                  placeholder="Enter city" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Select 
                placeholder="Select state" 
                value={state} 
                onChange={(e) => setState(e.target.value)} 
                width="50%"
              >
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={handleSave}
            isDisabled={!canSave}
            mx="auto"
          >
            Save Address
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
