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
} from "@chakra-ui/react";
import { TfiMenu, TfiLocationPin } from "react-icons/tfi";
import { GoSignOut } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter"; // Import the Filter component
import Address from "./Address";
import Login from "../Auth/Login"; // Import the Login component
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../../app/Slices/authSlice";

export default function Account() {
  const [selectedTab, setSelectedTab] = useState("orders");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isLargerThanLg] = useMediaQuery("(min-width: 62em)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const user = useSelector(selectUser);

  // Trigger login modal on /account route if not logged in
  useEffect(() => {
    if (!user && window.location.pathname === "/account") {
      onLoginOpen(); // Auto-open the modal when navigating to /account if not logged in
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
              onClick={handleSignOut} // Use the sign-out function
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
                  {user?.myOrders && user.myOrders.length > 0 ? (
                    user.myOrders.map((order, index) => (
                      <Box
                        key={index}
                        p={4}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="md"
                        width="full"
                      >
                        <Heading as="h3" size="md" mb={2}>
                          Order #{order.id}
                        </Heading>
                        <Text mb={2}>{order.details}</Text>
                        <Button variant="link" color="blue.600">
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
                <VStack spacing={4} align="start">
                  {user?.myAddresses && user.myAddresses.length > 0 ? (
                    user.myAddresses.map((address, index) => (
                      <Box
                        key={index}
                        p={4}
                        shadow="md"
                        borderWidth="1px"
                        borderRadius="md"
                        width="full"
                      >
                        <Text>{address.details}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text>No addresses found.</Text>
                  )}

                  {/* Add New Address Button */}
                  <SimpleGrid columns={[1, 2]} spacing={4}>
                    <Box
                      p={4}
                      shadow="md"
                      borderWidth="1px"
                      borderRadius="md"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderStyle="dashed"
                      onClick={onAddressOpen}
                      cursor="pointer"
                    >
                      <Center>
                        <Icon as={AiOutlinePlus} boxSize={8} color="blue.600" />
                        <Text ml={2} color="blue.600">
                          Add New Address
                        </Text>
                      </Center>
                    </Box>
                  </SimpleGrid>
                </VStack>
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
      <Address isOpen={isAddressOpen} onClose={onAddressClose} />

      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={onLoginClose} onOpen={onLoginOpen} />
    </>
  );
}
