import React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Image,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Sample array of image data
const images = [
  {
    id: 1,
    src: "https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg4NzEwNjY2NDY1NDUzODA0/1-best-iphones-2022.jpg",
    alt: "iPhone",
    title: "iphones", // Added title for navigation
    buttonText: "View More iPhones",
  },
  {
    id: 2,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAortg1RecNQDKlbsAQwmK6M_51-dmyS-7KQ&s",
    alt: "Android",
    title: "androids", // Added title for navigation
    buttonText: "View More Androids",
  },
  {
    id: 3,
    src: "https://5.imimg.com/data5/ANDROID/Default/2024/2/382543291/ZP/SY/HG/84554969/product-jpeg-500x500.jpg",
    alt: "Accessories",
    title: "accessories", // Added title for navigation
    buttonText: "View More Accessories",
  },
];

export default function Categories() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = (title) => {
    // Navigate to the specific category page
    navigate(`/categories/${title}`);
  };

  return (
    <Box mt={16} p={8} mb={3}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            _active={{ color: "gray.800" }}
            _hover={{ color: "gray.600" }}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/categories"
            _active={{ color: "gray.800" }}
            _hover={{ color: "gray.600" }}
          >
            Shop
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Shop Heading */}
      <Text fontSize="40px" mt={4} mb={5} fontWeight="800">
        Shop
      </Text>

      {/* Image Grid */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
        spacing={6}
        p={2}
      >
        {images.map((image) => (
          <Box
            key={image.id}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            onClick={() => handleClick(image.title)} // Update click handler
            borderRadius="md"
            _hover={{ borderRadius: "15px" }}
            role="group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              boxSize="100%"
              objectFit="cover"
            />
            <Box
              position="absolute"
              top="90%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity={0}
              transition="opacity 0.3s ease"
              p={4}
              borderRadius="md"
              textAlign="center"
              _hover={{ opacity: 1 }}
              _groupHover={{ opacity: 1 }}
            >
              <Button
                color="white"
                bg="black"
                _hover={{ bg: "gray.800" }}
                rightIcon={<IoArrowForward />}
              >
                {image.buttonText}
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
