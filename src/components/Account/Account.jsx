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

export default function Account() {
  const [selectedTab, setSelectedTab] = useState("orders");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isLargerThanLg] = useMediaQuery("(min-width: 62em)");

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI's modal control
  const {
    isOpen: isAddressOpen,
    onOpen: onAddressOpen,
    onClose: onAddressClose,
  } = useDisclosure();

  useEffect(() => {
    setIsLargeScreen(isLargerThanLg);
    if (isLargerThanLg) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
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
    handleFilterClose();
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
        <Text fontSize="2xl" fontWeight="400">
          +91 9068552519
        </Text>
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
              cursor="pointer"
              bg={selectedTab === "addresses" ? "blue.50" : "transparent"}
              p={2}
              borderRadius="md"
              borderBottom={
                selectedTab === "addresses" ? "2px solid blue.600" : "none"
              }
              onClick={() => handleTabClick("addresses")}
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
              onClick={() => navigate("/")}
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
                    onClick={onOpen} // Open the filter modal on click
                  >
                    Filter
                  </Button>
                </HStack>
                {/* Example Orders List */}
                <VStack spacing={4} align="start">
                  {/* Placeholder for order items */}
                  <Box
                    p={4}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                    width="full"
                  >
                    <Heading as="h3" size="md" mb={2}>
                      Order #12345
                    </Heading>
                    <Text mb={2}>Details about the order...</Text>
                    <Button variant="link" color="blue.600">
                      View Details
                    </Button>
                  </Box>
                  <Box
                    p={4}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                    width="full"
                  >
                    <Heading as="h3" size="md" mb={2}>
                      Order #12346
                    </Heading>
                    <Text mb={2}>Details about the order...</Text>
                    <Button variant="link" color="blue.600">
                      View Details
                    </Button>
                  </Box>
                </VStack>
              </>
            )}

            {selectedTab === "addresses" && (
              <>
                <SimpleGrid columns={[1, 2]} spacing={4}>
                  {/* Other address cards */}
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
                      <Icon as={AiOutlinePlus} boxSize={8} color="blue.500" />
                    </Center>
                    <Text ml={4}>Add Address</Text>
                  </Box>
                </SimpleGrid>
              </>
            )}
          </Box>
        )}
      </Stack>

      {/* Filter Modal */}
      <Filter
        isOpen={isOpen}
        onClose={onClose}
        onFilterChange={handleFilterChange}
        selectedFilter={selectedFilter}
      />

      {/* Address Modal */}
      <Address isOpen={isAddressOpen} onClose={onAddressClose} />
    </>
  );
}
