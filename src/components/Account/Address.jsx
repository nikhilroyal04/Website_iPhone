import React, { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { addAddress, editAddress } from "../../app/Slices/addressSlice";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
];

export default function Address({ isOpen, onClose, selectedAddress, userId }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [locality, setLocality] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const isEmailValid = email
    ? email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    : true;
  const isPhoneNumberValid = phoneNumber ? phoneNumber.match(/^\d{10}$/) : true;
  const isPincodeValid = pincode ? pincode.match(/^\d{6}$/) : true;

  const canSave =
    name &&
    phoneNumber &&
    isPhoneNumberValid &&
    email &&
    isEmailValid &&
    addressLine1 &&
    locality &&
    landmark &&
    pincode &&
    isPincodeValid &&
    city &&
    state;

  const handleSave = () => {
    const addressData = {
      userId,
      name,
      phoneNumber,
      email,
      addressLine1,
      locality,
      landmark,
      pincode,
      city,
      state,
    };

    if (selectedAddress) {
      dispatch(editAddress(selectedAddress._id, addressData));
    } else {
      dispatch(addAddress(addressData));
    }

    clearFields();
    onClose();
  };

  const clearFields = () => {
    setName("");
    setPhoneNumber("");
    setEmail("");
    setAddressLine1("");
    setLocality("");
    setLandmark("");
    setPincode("");
    setCity("");
    setState("");
  };

  useEffect(() => {
    if (isOpen) {
      if (selectedAddress) {
        setName(selectedAddress.name);
        setPhoneNumber(selectedAddress.phoneNumber);
        setEmail(selectedAddress.email);
        setAddressLine1(selectedAddress.addressLine1);
        setLocality(selectedAddress.locality);
        setLandmark(selectedAddress.landmark);
        setPincode(selectedAddress.pincode);
        setCity(selectedAddress.city);
        setState(selectedAddress.state);
      } else {
        clearFields(); // Clear fields when adding a new address
      }
    } else {
      clearFields(); // Clear fields when the modal is closed
    }
  }, [selectedAddress, isOpen]);

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
          {selectedAddress ? "Edit Address" : "Add New Address"}
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={() => {
              clearFields(); // Clear fields when modal is closed
              onClose();
            }}
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
              <FormControl
                isRequired
                isInvalid={!isPhoneNumberValid && phoneNumber.length > 0}
              >
                <FormLabel>Mobile</FormLabel>
                <Input
                  placeholder="Enter your mobile number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {!isPhoneNumberValid && phoneNumber.length > 0 && (
                  <FormErrorMessage>Invalid mobile number</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!isEmailValid && email.length > 0}
              >
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
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
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
              <FormControl
                isRequired
                isInvalid={!isPincodeValid && pincode.length > 0}
              >
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
            {selectedAddress ? "Update Address" : "Save Address"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
