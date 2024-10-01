import React, { useRef } from "react";
import {
  Box,
  Text,
  Image,
  Button,
  HStack,
  IconButton,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useAddToCart } from "../../utils/cartUtils";

export default function Other() {
  const { addToCart } = useAddToCart();

  // iPhone data
  const iPhones = [
    {
      _id: "66f4cdd5eec02d69bb763651",
      model: "iPhone 7",
      variants: [
        {
          _id: "66f4cdd5eec02d69bb763652",
          color: "Gold",
          price: "700",
          originalPrice: "800",
          discount: 12,
        },
        {
          _id: "66f4cdd5eec02d69bb763653",
          color: "White",
          price: "800",
          originalPrice: "900",
          discount: 11,
        },
      ],
    },
    // Add more iPhone objects here
    {
      _id: "66f4cdd5eec02d69bb763654",
      model: "iPhone 8",
      variants: [
        {
          _id: "66f4cdd5eec02d69bb763655",
          color: "Space Gray",
          price: "600",
          originalPrice: "750",
          discount: 20,
        },
      ],
    },
    {
      _id: "66f4cdd5eec02d69bb763656",
      model: "iPhone X",
      variants: [
        {
          _id: "66f4cdd5eec02d69bb763657",
          color: "Silver",
          price: "900",
          originalPrice: "1000",
          discount: 30,
        },
      ],
    },
    {
      _id: "66f4cdd5eec02d69bb763658",
      model: "iPhone XR",
      variants: [
        {
          _id: "66f4cdd5eec02d69bb763659",
          color: "Red",
          price: "700",
          originalPrice: "850",
          discount: 17,
        },
      ],
    },
    {
      _id: "66f4cdd5eec02d69bb763660",
      model: "iPhone 11",
      variants: [
        {
          _id: "66f4cdd5eec02d69bb763661",
          color: "Green",
          price: "900",
          originalPrice: "1100",
          discount: 18,
        },
      ],
    },
    {
      _id: "66f4cdd5eec02d69bb763662",
      model: "iPhone 12",
      variants: [
        {
          _id: "66f4cdd5eec02d69bb763663",
          color: "Black",
          price: "1000",
          originalPrice: "1200",
          discount: 16,
        },
      ],
    },
    {
      _id: "66f4cdd5eec02d69bb763664",
      model: "iPhone 13",
      variants: [
        {
          _id: "66f4cdd5eec02d69bb763665",
          color: "Blue",
          price: "1100",
          originalPrice: "1300",
          discount: 15,
        },
      ],
    },
  ];

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Box height="auto" maxW="90vw" mx="auto">
      {/* Header with buttons */}
      <Flex justify="space-between" align="center" mt={4}>
        <Text fontSize="2xl" fontWeight="800" textAlign="start">
          Other Popular Products
        </Text>
        <HStack spacing={2}>
          {/* Left Scroll Button */}
          <IconButton
            aria-label="Scroll Left"
            icon={<IoArrowBack />}
            onClick={scrollLeft}
            borderRadius="50px"
            color="blue"
            size="xs"
          />
          {/* Right Scroll Button */}
          <IconButton
            aria-label="Scroll Right"
            borderRadius="50px"
            icon={<IoArrowForward />}
            onClick={scrollRight}
            color="blue"
            size="xs"
          />
        </HStack>
      </Flex>

      {/* Horizontal Scrollable HStack */}
      <Box position="relative" mt={4}>
        <HStack
          overflowX="auto"
          spacing={4}
          ref={sliderRef}
          scrollbar="none"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          py={2}
        >
          {iPhones.map((phone) =>
            phone.variants.map((variant) => (
              <Box
                key={variant._id}
                position="relative"
                overflow="hidden"
                cursor="pointer"
                borderRadius="md"
                role="group"
                flexShrink={0}
                flex="0 0 260px" // Each product box takes 240px width
                p={4}
                bg="white"
              >
                <VStack spacing={2} align="center">
                  <Image
                    src="https://via.placeholder.com/200" 
                    alt={`${phone.model} ${variant.color}`}
                    objectFit="cover"
                    width="100%"
                    height="200px" 
                    borderRadius="md"
                  />
                  <Text fontWeight="bold" fontSize="md" mt={2} noOfLines={1}>
                    {phone.model} - {variant.color}
                  </Text>
                  <HStack spacing={1}>
                    <Text color="blue.500" fontWeight="bold">
                      ₹{variant.price}
                    </Text>
                    <Text as="s" color="gray.500">
                      ₹{variant.originalPrice}
                    </Text>
                    <Text color="red.500" fontWeight="bold">
                      ({variant.discount}% off)
                    </Text>
                  </HStack>
                  <Button
                    variant="outline"
                    color="blue"
                    width="full"
                    mt={2}
                    onClick={(e) => {
                      e.stopPropagation();
                      // addToCart(cartItem);
                    }}
                  >
                    Add to cart
                  </Button>
                </VStack>
              </Box>
            ))
          )}
        </HStack>
      </Box>
    </Box>
  );
}
