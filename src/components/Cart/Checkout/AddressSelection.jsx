import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSelectedAddress,
  selectAddressError,
  selectAddressLoading,
  fetchAddressByUserId,
} from "../../../app/Slices/addressSlice";
import { selectUser } from "../../../app/Slices/authSlice";
import {
  Box,
  Button,
  Center,
  HStack,
  SimpleGrid,
  Text,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";

import Address from "../../Account/Address";
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";
import Login from "../../Auth/Login";

export default function AddressDetails({
  setOrderDetails,
  selectedAddress,
  setSelectedAddress,
}) {
  const dispatch = useDispatch();
  const addressData = useSelector(selectSelectedAddress);
  const addressError = useSelector(selectAddressError);
  const addressLoading = useSelector(selectAddressLoading);
  const user = useSelector(selectUser);
  const userId = user ? user.id : null;

  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Manage login modal state

  useEffect(() => {
    if (userId) {
      dispatch(fetchAddressByUserId(userId));
    }
  }, [dispatch, userId]);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setIsAddressOpen(true);
  };

  const handleAddNewAddress = () => {
    setSelectedAddress(null); // Clear selected address for new entry
    setIsAddressOpen(true);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); // Set the clicked address as selected
    setOrderDetails({ shippingAddress: address }); // Pass the selected address to the parent
  };

  if (addressLoading) {
    return <Loader />;
  }

  if (addressError) {
    return <Error502 />;
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Box
        width="80vw"
        margin="0 auto"
        p={5}
        mt={14}
        h="70vh"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="lg" mb={4}>
          Please log in to buy products.
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => setIsLoginOpen(true)}
          size="md"
        >
          Login
        </Button>

        {/* Login Modal */}
        <Login
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onOpen={() => setIsLoginOpen(true)}
        />
      </Box>
    );
  }

  return (
    <Box
      width="80vw"
      p={5}
      mt={5}
      h="80vh"
      overflowY="auto"
      borderRadius="md"
      boxShadow="lg"
    >
      <Stack spacing={4}>
        <HStack spacing={4} mb={4} align="center">
          <Text fontSize="2xl" fontWeight="800" flex="1">
            Select Address
          </Text>
        </HStack>

        {/* Render User Addresses */}
        {addressData && addressData.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
            spacing={4}
            width="100%"
          >
            {/* Add New Address Button */}
            <Box
              p={4}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderStyle="dashed"
              onClick={handleAddNewAddress}
              cursor="pointer"
              bg="white"
            >
              <Center>
                <Icon as={AiOutlinePlus} boxSize={8} color="blue.600" />
                <Text ml={2} color="blue.600">
                  Add New Address
                </Text>
              </Center>
            </Box>

            {addressData.map((address) => (
              <Box
                key={address._id}
                p={5}
                shadow="md"
                borderWidth="2px"
                borderRadius="md"
                width="full"
                bg="white"
                cursor="pointer"
                borderColor={
                  selectedAddress && selectedAddress._id === address._id
                    ? "blue.600"
                    : "gray.200"
                } // Change border color if selected
                onClick={() => handleSelectAddress(address)} // Select address on click
              >
                <Text fontWeight="bold">{address.name}</Text>
                <Text>{address.email}</Text>
                <Text>{address.addressLine1}</Text>
                <Text>
                  {address.city}-{address.pincode}
                </Text>
                <HStack mt={2}>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    size="xs"
                    onClick={() => handleEdit(address)}
                  >
                    Edit
                  </Button>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box width="100%" height="100%" mx="auto">
            <Text textAlign="center" fontSize="xl" fontWeight="400" mt={10}>
              No addresses found.
            </Text>
          </Box>
        )}

        {/* Address Modal */}
        <Address
          isOpen={isAddressOpen}
          onClose={() => setIsAddressOpen(false)}
          selectedAddress={selectedAddress}
          userId={userId}
        />
      </Stack>
    </Box>
  );
}
