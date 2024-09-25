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

export default function Other() {
  const products = [
    {
      id: 1,
      src: "https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg4NzEwNjY2NDY1NDUzODA0/1-best-iphones-2022.jpg",
      alt: "Premium Oversized SILVER Cotton T-Shirt",
      title: "Premium Oversized SILVER Cotton T-Shirt",
      price: 599,
      originalPrice: 1499,
      discount: 60,
    },
    {
      id: 2,
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAortg1RecNQDKlbsAQwmK6M_51-dmyS-7KQ&s",
      alt: "Beige Tee",
      title: "Beige Tee",
      price: 599,
      originalPrice: 1499,
      discount: 60,
    },
    {
      id: 3,
      src: "https://5.imimg.com/data5/ANDROID/Default/2024/2/382543291/ZP/SY/HG/84554969/product-jpeg-500x500.jpg",
      alt: "Black Tee",
      title: "Black Tee",
      price: 599,
      originalPrice: 1499,
      discount: 60,
    },
    {
      id: 4,
      src: "https://5.imimg.com/data5/ANDROID/Default/2024/2/382543291/ZP/SY/HG/84554969/product-jpeg-500x500.jpg",
      alt: "BUY 2 ONLY 1299 Premium Cotton",
      title: "BUY 2 ONLY 1299 Premium Cotton",
      price: 999,
      originalPrice: 2999,
      discount: 67,
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
          {products.map((product) => (
            <Box
              key={product.id}
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
                  src={product.src}
                  alt={product.alt}
                  objectFit="cover"
                  width="100%"
                  height="200px" // Smaller image size
                  borderRadius="md"
                />
                <Text fontWeight="bold" fontSize="md" mt={2} noOfLines={2}>
                  {product.title}
                </Text>
                <HStack spacing={1}>
                  <Text color="green.500" fontWeight="bold">
                    ₹{product.price}
                  </Text>
                  <Text as="s" color="gray.500">
                    ₹{product.originalPrice}
                  </Text>
                  <Text color="green.500" fontWeight="bold">
                    ({product.discount}% off)
                  </Text>
                </HStack>
                <Button variant="outline" color="blue" width="full" mt={2}>
                  Add to cart
                </Button>
              </VStack>
            </Box>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
