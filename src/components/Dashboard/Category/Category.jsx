import React from "react";
import { Box, Grid, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    console.log("Navigation triggered");
  };

  return (
    <Box p={6} display={{ base: "inline", lg: "flex" }} width="90vw">
      {/* Title Section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mr={10}
        mb={5}
      >
        <Text fontSize="4xl" alignItems="center" fontWeight="800">
          Categories
        </Text>
      </Box>

      {/* Grid of Images */}
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
        gap={6}
      >
        {/* Image 1 with Hover Button */}
        <Box
          position="relative"
          overflow="hidden"
          _hover={{ ".hover-content": { opacity: 1 } }}
          onClick={handleClick}
          cursor="pointer"
        >
          <Image
            src="https://www.thestreet.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg4NzEwNjY2NDY1NDUzODA0/1-best-iphones-2022.jpg"
            alt="Image 1"
            boxSize="100%"
            objectFit="cover"
          />
          <Box
            className="hover-content"
            position="absolute"
            top="80%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0}
            transition="opacity 0.3s ease"
            p={4}
            borderRadius="md"
            textAlign="center"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from bubbling up
              handleClick();
            }}
          >
            <Button color="white" bg="black" _hover={{ bg: "gray.800" }}>
              View More iPhones
            </Button>
          </Box>
        </Box>

        {/* Image 2 with Hover Button */}
        <Box
          position="relative"
          overflow="hidden"
          _hover={{ ".hover-content": { opacity: 1 } }}
          onClick={handleClick}
          cursor="pointer"
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAortg1RecNQDKlbsAQwmK6M_51-dmyS-7KQ&s"
            alt="Image 2"
            boxSize="100%"
            objectFit="cover"
          />
          <Box
            className="hover-content"
            position="absolute"
            top="80%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0}
            transition="opacity 0.3s ease"
            p={4}
            borderRadius="md"
            textAlign="center"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from bubbling up
              handleClick();
            }}
          >
            <Button color="white" bg="black" _hover={{ bg: "gray.800" }}>
              View More Androids
            </Button>
          </Box>
        </Box>

        {/* Image 3 with Hover Button */}
        <Box
          position="relative"
          overflow="hidden"
          _hover={{ ".hover-content": { opacity: 1 } }}
          onClick={handleClick}
          cursor="pointer"
        >
          <Image
            src="https://5.imimg.com/data5/ANDROID/Default/2024/2/382543291/ZP/SY/HG/84554969/product-jpeg-500x500.jpg"
            alt="Image 3"
            boxSize="100%"
            objectFit="cover"
          />
          <Box
            className="hover-content"
            position="absolute"
            top="80%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0}
            transition="opacity 0.3s ease"
            p={4}
            borderRadius="md"
            textAlign="center"
            onClick={(e) => {
              e.stopPropagation(); // Prevent click event from bubbling up
              handleClick();
            }}
          >
            <Button color="white" bg="black" _hover={{ bg: "gray.800" }}>
              View More Accessories
            </Button>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default Category;
