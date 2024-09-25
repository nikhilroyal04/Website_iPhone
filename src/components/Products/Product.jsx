import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Text,
  Select,
  Grid,
  VStack,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Divider,
  Flex,
} from "@chakra-ui/react";

export default function Product() {
  const { title } = useParams();

  // Sample data for products
  const cards = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/150",
      description: "Product 1",
      price: 5000,
      originalPrice: 8000,
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/150",
      description: "Product 2",
      price: 3000,
      originalPrice: 5000,
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/150",
      description: "Product 3",
      price: 4500,
      originalPrice: 6000,
    },
    {
      id: 4,
      imageUrl: "https://via.placeholder.com/150",
      description: "Product 3",
      price: 4500,
      originalPrice: 6000,
    },
    {
      id: 5,
      imageUrl: "https://via.placeholder.com/150",
      description: "Product 3",
      price: 4500,
      originalPrice: 6000,
    },
    {
      id: 6,
      imageUrl: "https://via.placeholder.com/150",
      description: "Product 3",
      price: 4500,
      originalPrice: 6000,
    },
    {
      id: 7,
      imageUrl: "https://via.placeholder.com/150",
      description: "Product 3",
      price: 4500,
      originalPrice: 6000,
    },
    // Add more products as needed
  ];

  return (
    <Box p={8} mt={16}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories">Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/categories/${title}`}>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Category Heading and Sort By Dropdown */}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={{ base: "wrap", lg: "nowrap" }} // Wrap on small screens
      >
        <Text fontSize="4xl" fontWeight="800">
          {title.charAt(0).toUpperCase() + title.slice(1)} Products (
          {cards.length})
        </Text>
        <Flex display={{ base: "none", lg: "flex" }} alignItems="center">
          {" "}
          {/* Hide on small screens */}
          <Text fontSize="15px" fontWeight="800" mr={5} my="auto">
            Sort by:
          </Text>
          <Select placeholder="Sort by" width="200px" borderRadius="10px">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </Select>
        </Flex>
      </Box>

      {/* Filters and Product Grid */}
      <Box display={{ base: "block", lg: "flex" }} mt={6}>
        <Box
          width={{ base: "100%", lg: "30%" }}
          pr={4}
          display={{ base: "none", lg: "block" }}
        >
          <Text fontWeight="bold" mb={2}>
            Filters
          </Text>
          <Divider border="1px" mb={3} />
          <Text mb={1}>Price</Text>
          {/* Add range slider or price inputs */}
          <Text mb={1}>Color</Text>
          {/* Add color options */}
          <Text mb={1}>Warranty</Text>
          {/* Add warranty options */}
        </Box>
        <Box width={{ base: "100%", lg: "70%" }}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
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
                    borderRadius="md"
                  />
                  {/* Add to Cart button, initially hidden */}
                  <Button
                    variant="none"
                    position="absolute"
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
        </Box>
      </Box>
    </Box>
  );
}
