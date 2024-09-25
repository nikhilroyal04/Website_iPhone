import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  Stack,
  VStack,
  HStack,
  Divider,
  Select,
  Badge,
  useBreakpointValue,
} from "@chakra-ui/react";
import Other from "./Other";

const Cart = () => {
  const initialCartItems = [
    {
      id: 1,
      name: "iPhone 13 Pro",
      originalPrice: 129900,
      price: 119900,
      discount: 8,
      size: "128GB",
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "AirPods Pro (2nd Generation)",
      originalPrice: 24900,
      price: 22900,
      discount: 8,
      size: "Standard",
      quantity: 1,
      imageUrl: "https://via.placeholder.com/100",
    },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalSavings = items.reduce(
      (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
      0
    );
    return { totalAmount, totalSavings };
  };

  const { totalAmount, totalSavings } = calculateTotal(cartItems);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    setCartItems(updatedItems);
  };

  // Responsive stacking for small screens
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  // Payment Summary JSX to reuse based on screen size
  const PaymentSummary = (
    <Box w={isSmallScreen ? "100%" : "40%"}>
      <Box borderWidth="1px" p={4} borderRadius="md" boxShadow="sm" bg="white">
        <VStack align="stretch" spacing={4}>
          <Text fontSize="lg" fontWeight="semibold">
            Coupons and offers
          </Text>
          <HStack justify="space-between">
            <Text fontSize="sm" color="green.500">
              2 Offers
            </Text>
            <Badge colorScheme="green">8% OFF</Badge>
          </HStack>

          <Divider />

          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between">
              <Text>Item total</Text>
              <Text>₹{totalAmount}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Delivery fee</Text>
              <Text color="green.500">FREE</Text>
            </HStack>
            <Divider />
            <HStack justify="space-between" fontWeight="semibold">
              <Text>Grand total</Text>
              <Text>₹{totalAmount}</Text>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              Inclusive of all taxes
            </Text>
          </VStack>

          <Text fontSize="sm" color="gray.500">
            Average delivery time: 3-5 days
          </Text>
          <Text fontSize="sm" color="green.500">
            8% (₹{totalSavings}) saved so far on this order
          </Text>

          <Button mt={4} colorScheme="blue" size="lg" w="full">
            Continue
          </Button>
        </VStack>
      </Box>
    </Box>
  );

  return (
    <>
      <Box p={5} mt={16} maxW="80vw" mx="auto" mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Shopping Cart ({cartItems.length} Items)
        </Text>

        {/* Render the payment box beside the cart items on large screens */}
        <Stack direction={isSmallScreen ? "column" : "row"} spacing={6}>
          {/* Cart Items */}
          <Box w={isSmallScreen ? "100%" : "60%"}>
            <Stack spacing={6}>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  boxShadow="sm"
                  bg="white"
                >
                  <Flex justify="space-between" align="center">
                    <HStack>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        boxSize="100px"
                      />
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="semibold" fontSize="lg">
                          {item.name}
                        </Text>
                        <HStack>
                          <Text as="s" color="gray.500">
                            ₹{item.originalPrice}
                          </Text>
                          <Text color="green.500">
                            ₹{item.price} ({item.discount}% off)
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.500">
                          You saved ₹{item.originalPrice - item.price}
                        </Text>
                        <Flex>
                          <Select size="sm" defaultValue={item.size} w="100px">
                            <option value="128GB">128GB</option>
                            <option value="256GB">256GB</option>
                            <option value="512GB">512GB</option>
                          </Select>
                          <Select
                            size="sm"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(item.id, e.target.value)
                            }
                            w="60px"
                            ml={2}
                          >
                            {[...Array(5).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Select>
                        </Flex>
                      </VStack>
                    </HStack>
                    <Button variant="outline" colorScheme="red" size="sm">
                      Remove
                    </Button>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Show Payment Box beside cart items only on large screens */}
          {!isSmallScreen && PaymentSummary}
        </Stack>
      </Box>

      {/* Render Other section */}
      <Other />

      {/* Show Payment Box below "Other" section on small screens */}
      {isSmallScreen && (
        <Box p={5} maxW="90vw" mx="auto">
          {PaymentSummary}
        </Box>
      )}
    </>
  );
};

export default Cart;
