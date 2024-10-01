import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  Divider,
  Stack,
  Icon,
  SimpleGrid,
  Center,
  Flex,
  useMediaQuery,
  useDisclosure,
  Heading,
  Badge,
} from "@chakra-ui/react";
import { TfiMenu, TfiLocationPin } from "react-icons/tfi";
import { GoSignOut } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter";
import Address from "./Address";
import Login from "../Auth/Login";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../app/Slices/authSlice";
import {
  selectUserData,
  selectUserDataError,
  selectUserDataLoading,
  getUserDataItemsByUserId,
  deleteUserAddress,
} from "../../app/Slices/userDataSlice";
import DeleteConfirmationModal from "./DeleteConfimationModal";
import OrderDetailsModal from "./OrderDetailsModal";
import TimeConversion from "../../utils/timeConversion";
import Loader from "../NotFound/Loader";
import Error502 from "../NotFound/Error502";

export default function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const userDataError = useSelector(selectUserDataError);
  const userDataLoading = useSelector(selectUserDataLoading);

  const user = useSelector(selectUser);
  const userId = user ? user._id : null;

  useEffect(() => {
    if (userId) {
      dispatch(getUserDataItemsByUserId(userId));
    }
  }, [dispatch, userId]);

  const [selectedTab, setSelectedTab] = useState("orders");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Add state for the selected address
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Delete confirmation modal state and functions
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  // Add state for Order Details Modal
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isLargerThanLg] = useMediaQuery("(min-width: 62em)");

  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure(); // Chakra UI's modal control
  const {
    isOpen: isAddressOpen,
    onOpen: onAddressOpen,
    onClose: onAddressClose,
  } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  // Trigger login modal on /account route if not logged in
  useEffect(() => {
    if (!user && window.location.pathname === "/account") {
      onLoginOpen();
    }
  }, [user, onLoginOpen]);

  useEffect(() => {
    setIsLargeScreen(isLargerThanLg);
    setShowSidebar(isLargerThanLg); // Automatically show sidebar on large screens
  }, [isLargerThanLg]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if (!isLargeScreen) {
      setShowSidebar(false);
    }
  };

  const handleGoBack = () => {
    setShowSidebar(true);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilterClose(); // Close filter modal after selection
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/"); // Redirect to home page after sign out
  };

  // Handle address delete request
  const handleDelete = (id) => {
    setAddressToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion of address
  const confirmDelete = () => {
    if (addressToDelete) {
      // Dispatch action to delete the address
      dispatch(deleteUserAddress(userId, addressToDelete));

      // Clear the address to delete and close the modal
      setAddressToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
    onAddressOpen();
  };

  const handleAddNewAddress = () => {
    setSelectedAddress(null);
    onAddressOpen();
  };

  // Function to open the order details modal
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "yellow";
      case "Shipped":
        return "green";
      case "Delivered":
        return "blue";
      case "Cancelled":
        return "red";
      case "Returned":
        return "purple";
      case "Refunded":
        return "gray";
      default:
        return "gray";
    }
  };

  return (
    <>
      <Flex
        mt={{ base: 14, lg: 20 }}
        justifyContent="space-between"
        width="80%"
        mx="auto"
      >
        <Text fontSize="2xl" fontWeight="400">
          Account
        </Text>
        {user ? (
          <Text fontSize="xl" fontWeight="600" color="green">
            Welcome, {user.name}
          </Text>
        ) : (
          <Button onClick={onLoginOpen} colorScheme="blue">
            Login
          </Button>
        )}
      </Flex>

      {!isLargeScreen && <Divider mt={2} />}

      <Stack
        direction={{ base: "column", lg: "row" }}
        spacing={1}
        ml={{ base: 4, lg: 28 }}
        align="flex-start"
      >
        {/* Sidebar */}
        {showSidebar && (
          <Box
            width={{ base: "100%", lg: "25%" }}
            p={5}
            px={{ base: 4, lg: 4 }}
            display={{ base: "block", lg: "block" }}
          >
            <Box
              mb={3}
              cursor="pointer"
              bg={selectedTab === "orders" ? "blue.50" : "transparent"}
              p={2}
              borderRadius="md"
              borderBottom={
                selectedTab === "orders" ? "2px solid blue.600" : "none"
              }
              onClick={() => handleTabClick("orders")}
            >
              <Text fontSize="xl" display="flex" alignItems="center">
                <Icon
                  as={TfiMenu}
                  color={selectedTab === "orders" ? "blue.600" : "black"}
                  mr={2}
                />
                My Orders
              </Text>
            </Box>
            <Box
              mb={3}
              cursor={user ? "pointer" : "not-allowed"} // Disable clicking if not logged in
              bg={selectedTab === "addresses" ? "blue.50" : "transparent"}
              p={2}
              borderRadius="md"
              borderBottom={
                selectedTab === "addresses" ? "2px solid blue.600" : "none"
              }
              onClick={() => {
                if (user) {
                  handleTabClick("addresses");
                }
              }}
            >
              <Text fontSize="xl" display="flex" alignItems="center">
                <Icon
                  as={TfiLocationPin}
                  color={selectedTab === "addresses" ? "blue.600" : "black"}
                  mr={2}
                />
                My Addresses
              </Text>
            </Box>
            <Box
              mb={3}
              cursor="pointer"
              p={2}
              borderRadius="md"
              onClick={handleSignOut}
            >
              <Text fontSize="xl" display="flex" alignItems="center">
                <Icon as={GoSignOut} mr={2} />
                Sign Out
              </Text>
            </Box>
          </Box>
        )}

        {/* Divider for large screens */}
        {isLargeScreen && (
          <Divider
            orientation="vertical"
            display={{ base: "none", lg: "block" }}
            py={72}
          />
        )}

        {/* Go Back button and Details view for small screens */}
        {!showSidebar && !isLargeScreen && (
          <Box width="100%" p={4}>
            <Button onClick={handleGoBack} variant="outline" color="blue.600">
              Go Back
            </Button>
          </Box>
        )}

        {/* Main Content */}
        {(showSidebar === false || isLargeScreen) && (
          <Box width={{ base: "100%", lg: "70%" }} p={3}>
            {userDataLoading && <Loader />}
            {userDataError && <Error502 />}
            {!userDataLoading && !userDataError && (
              <>
                {selectedTab === "orders" && (
                  <>
                    <HStack spacing={4} mb={4} align="center">
                      <Text fontSize="lg" flex="1">
                        Showing{" "}
                        {selectedFilter === "all"
                          ? "all orders"
                          : `${selectedFilter} orders`}
                      </Text>
                      <Button
                        leftIcon={<CiFilter />}
                        color="blue"
                        bg="white"
                        variant="outline"
                        onClick={onFilterOpen} // Open the filter modal on click
                      >
                        Filter
                      </Button>
                    </HStack>

                    {/* Render User Orders */}
                    <VStack spacing={4} align="start">
                      {userData?.orders && userData.orders.length > 0 ? (
                        userData.orders
                          .filter((order) =>
                            selectedFilter === "all"
                              ? true
                              : order.orderStatus === selectedFilter
                          )
                          .map((order, index) => (
                            <Box
                              key={index}
                              p={4}
                              shadow="md"
                              borderWidth="1px"
                              borderRadius="md"
                              width="full"
                              _hover={{ shadow: "lg", borderColor: "blue.300" }} // Add hover effect
                              transition="0.2s ease"
                            >
                              <Heading as="h3" size="md" mb={2}>
                                {order.productName}
                              </Heading>
                              <Badge
                                colorScheme={getOrderStatusColor(
                                  order.orderStatus
                                )}
                                mb={2}
                              >
                                {order.orderStatus}
                              </Badge>
                              <Text fontSize="sm" mb={2}>
                                {TimeConversion.unixTimeToRealTime(
                                  order.createdOn
                                )}
                              </Text>
                              <Button
                                variant="link"
                                color="blue.600"
                                onClick={() => handleViewDetails(order)}
                              >
                                View Details
                              </Button>
                            </Box>
                          ))
                      ) : (
                        <Box
                          width="full"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          height="60vh"
                        >
                          <Text textAlign="center" fontSize="xl">
                            No orders found.
                          </Text>
                        </Box>
                      )}
                    </VStack>
                  </>
                )}

                {selectedTab === "addresses" && (
                  <>
                    <HStack spacing={4} mb={4} align="center">
                      <Text fontSize="lg" flex="1">
                        My Addresses
                      </Text>
                    </HStack>

                    {/* Render User Addresses */}
                    <SimpleGrid
                      columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
                      spacing={4}
                      width="full"
                    >
                      {userData?.addresses && userData.addresses.length > 0 ? (
                        userData.addresses.map((address) => (
                          <Box
                            key={address._id}
                            p={4}
                            shadow="md"
                            borderWidth="1px"
                            borderRadius="md"
                            width="full"
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
                              <Button
                                colorScheme="red"
                                variant="outline"
                                size="xs"
                                onClick={() => handleDelete(address._id)}
                              >
                                Delete
                              </Button>
                            </HStack>
                          </Box>
                        ))
                      ) : (
                        <Text>No addresses found.</Text>
                      )}

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
                      >
                        <Center>
                          <Icon
                            as={AiOutlinePlus}
                            boxSize={8}
                            color="blue.600"
                          />
                          <Text ml={2} color="blue.600">
                            Add New Address
                          </Text>
                        </Center>
                      </Box>
                    </SimpleGrid>
                  </>
                )}
              </>
            )}
          </Box>
        )}
      </Stack>

      {/* Filter Modal */}
      <Filter
        isOpen={isFilterOpen}
        onClose={onFilterClose}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      />

      {/* Address Modal */}
      <Address
        isOpen={isAddressOpen}
        onClose={onAddressClose}
        selectedAddress={selectedAddress}
        userId={userId}
      />

      {/* Delete Confirmation Modal */}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      <OrderDetailsModal
        isOpen={isOrderDetailsOpen}
        onClose={() => setIsOrderDetailsOpen(false)}
        order={selectedOrder}
      />

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={onLoginClose} onOpen={onLoginOpen} />
    </>
  );
}
