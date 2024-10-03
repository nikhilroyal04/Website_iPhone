import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  Image,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccessoryById,
  selectAccessoryById,
  selectAccessoryError,
  selectAccessoryLoading,
} from "../../../app/Slices/accessorySlice";
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";
import Dummy from "../../../assets/images/Dummy.jpg"; // Placeholder image

export default function AcView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const accessoryData = useSelector(selectAccessoryById);
  const loading = useSelector(selectAccessoryLoading);
  const error = useSelector(selectAccessoryError);

  useEffect(() => {
    dispatch(fetchAccessoryById(id));
  }, [dispatch, id]);

  console.log("access", accessoryData);

  useEffect(() => {
    if (
      accessoryData &&
      accessoryData.variants &&
      accessoryData.variants.length > 0
    ) {
      const initialVariant = accessoryData.variants.find(
        (variant) => variant.quantity > 0
      );
      setSelectedVariant(initialVariant);
      setMainImage(accessoryData.media[0] || Dummy); // Set default main image
    }
  }, [accessoryData]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const availableVariant = accessoryData.variants.find(
      (variant) => variant.color === color && variant.quantity > 0
    );
    setSelectedVariant(availableVariant);
    setMainImage(accessoryData.media[0] || Dummy); // Reset main image on color change
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  // Get unique colors for the selected color
  const uniqueColors = Array.from(
    new Set(accessoryData?.variants.map((variant) => variant.color))
  );

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
        <BreadcrumbItem>
          <BreadcrumbLink href={`/categories/accessories`}>
            Accessories
          </BreadcrumbLink>
        </BreadcrumbItem>
        {accessoryData && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/categories/accessories`}>
              {accessoryData.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      {/* Loading and Error Handling */}
      {loading && <Loader />}
      {error && <Error502 />}

      {/* Main Content */}
      {!loading && !error && accessoryData && selectedVariant && (
        <Box
          mt={2}
          mx="auto"
          justifyContent="center"
          overflow="hidden"
          alignItems="center"
          alignContent="center"
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={6}
            mt={5}
            alignItems="center"
            justifyContent="center"
          >
            {/* Left Side - Main Image (50% width) */}
            <GridItem
              width="80%"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mx="auto"
            >
              <Image
                src={mainImage} // Display selected main image
                alt={accessoryData.name}
                width="100%"
                height="auto"
                maxHeight="50vh"
                borderRadius="md"
                boxShadow="md"
              />
              <HStack spacing={2} mt={4}>
                {accessoryData.media.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width="70px"
                    height="70px"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => handleImageChange(image)} // Change main image on click
                    boxShadow="md"
                  />
                ))}
              </HStack>
            </GridItem>

            {/* Right Side - Product Details (50% width) */}
            <GridItem
              width="100%"
              mt={5}
              display="flex"
              flexDirection="column"
              alignItems="start"
              mx="auto"
            >
              {/* Heading */}
              <Heading as="h2" size="lg" mb={2}>
                {accessoryData.name}
              </Heading>

              {/* Price Section */}
              <Text fontSize="xl" color="green.500">
                Price: <strong>₹{selectedVariant.price}</strong>
              </Text>
              <Text as="s" fontSize="md" color="gray.500">
                Original Price: ₹{selectedVariant.originalPrice}
              </Text>
              <Text fontSize="md" color="red.500">
                {(
                  ((selectedVariant.originalPrice - selectedVariant.price) /
                    selectedVariant.originalPrice) *
                  100
                ).toFixed(0)}
                % Off
              </Text>

              {/* Color Selection */}
              <Text mt={6} mb={2} fontWeight="bold">
                Select Color:
              </Text>
              <HStack spacing={2}>
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    sm: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                  }}
                  gap={4}
                >
                  {uniqueColors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "solid" : "outline"}
                      onClick={() => handleColorChange(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </Grid>
              </HStack>

              {/* Add to Cart & Buy Now Buttons */}
              <HStack spacing={4} mt={6} width="100%">
                <Button colorScheme="teal" size="lg" width="100%">
                  Add to Cart
                </Button>
                <Button colorScheme="yellow" size="lg" width="100%">
                  Buy Now
                </Button>
              </HStack>
            </GridItem>
          </Grid>
        </Box>
      )}

      {/* Other Device Details */}
      {!loading && !error && accessoryData && (
        <Box mt={2} p={10} borderWidth="1px" borderRadius="lg">
          <Heading as="h3" size="md" mt={5} mb={4}>
            Device Details
          </Heading>

          <Text>
            Condition: <strong>{accessoryData.condition}</strong>
          </Text>
          <Text>
            Warranty: <strong>{accessoryData.warranty}</strong>
          </Text>
        </Box>
      )}
    </Box>
  );
}
