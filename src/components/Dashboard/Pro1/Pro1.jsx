import React from "react";
import { Box, Text, Grid, Image, VStack, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Pro1 = () => {
  const navigate = useNavigate();

  // Example data for the cards

  const cards = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    imageUrl: "https://via.placeholder.com/300",
    description: "Product Description",
    price: 4999,
    originalPrice: 7999,
  }));

  return (
    <Box bg="gray.50" p={4}>
      <Text fontSize="4xl" fontWeight="bold" mb={6} textAlign="center">
        Product Showcase
      </Text>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {cards.map((card) => (
          <VStack
            key={card.id}
            spacing={3}
            align="start"
            p={4}
            borderRadius="md"
            position="relative"
            className="card"
            cursor="pointer"
            role="group"
          >
            {/* Wrapper for image and hover button */}
            <Box position="relative" w="full">
              <Image
                src={card.imageUrl}
                alt={`Product ${card.id}`}
                boxSize="full"
                objectFit="cover"
                transition="all 0.3s ease"
                _groupHover={{
                  borderRadius: "15px",
                }}
              />
              {/* Add to Cart button, initially hidden */}
              <Button
                position="absolute"
                variant="none"
                bottom="4"
                left="50%"
                transform="translateX(-50%)"
                bg="#323232"
                color="white"
                borderRadius="10px"
                width="90%"
                opacity={0}
                transition="opacity 0.3s ease"
                _groupHover={{ opacity: 1 }}
              >
                Add to Cart
              </Button>
            </Box>
            <Text fontWeight="semibold">{card.description}</Text>
            <Text fontSize="lg" color="blue.600">
              ₹{card.price}
              <Text as="span" textDecoration="line-through" ml={2}>
                ₹{card.originalPrice}
              </Text>
              <Text as="span" color="red.500" ml={2}>
                (40% off)
              </Text>
            </Text>
          </VStack>
        ))}
      </Grid>
      <Flex justify="center" mt={8}>
        <Button
          maxWidth="300px"
          bg="black"
          color="white"
          _hover={{ bg: "gray.800" }}
          onClick={() => navigate("/categories")}
        >
          View All
        </Button>
      </Flex>
    </Box>
  );
};

export default Pro1;
