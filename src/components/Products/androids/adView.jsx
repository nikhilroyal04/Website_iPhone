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
  fetchAndroidById,
  selectAndroidById,
  selectAndroidError,
  selectAndroidLoading,
} from "../../../app/Slices/androidSlice";
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";
import Dummy from "../../../assets/images/Dummy.jpg"; // Placeholder image

export default function AdView() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const androidData = useSelector(selectAndroidById);
  const loading = useSelector(selectAndroidLoading);
  const error = useSelector(selectAndroidError);

  useEffect(() => {
    dispatch(fetchAndroidById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (
      androidData &&
      androidData.variants &&
      androidData.variants.length > 0
    ) {
      const initialVariant = androidData.variants.find(
        (variant) => variant.quantity > 0
      );
      setSelectedVariant(initialVariant);
      setMainImage(androidData.media[0] || Dummy); // Default main image
    }
  }, [androidData]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setSelectedStorage(null); // Reset storage when color changes
    const availableVariant = androidData.variants.find(
      (variant) => variant.color === color && variant.quantity > 0
    );
    setSelectedVariant(availableVariant);
    setMainImage(androidData.media[0] || Dummy); // Reset main image on color change
  };

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);
    const availableVariant = androidData.variants.find(
      (variant) =>
        variant.storage === storage && variant.color === selectedColor
    );
    setSelectedVariant(availableVariant);
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  const uniqueColors = Array.from(
    new Set(androidData?.variants.map((variant) => variant.color))
  );
  const availableStorageOptions = selectedColor
    ? Array.from(
        new Set(
          androidData.variants
            .filter((variant) => variant.color === selectedColor)
            .map((variant) => variant.storage)
        )
      )
    : [];

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
          <BreadcrumbLink href={`/categories/android`}>Android</BreadcrumbLink>
        </BreadcrumbItem>
        {androidData && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={`/categories/android`}>
              {androidData.model}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      {/* Loading and Error Handling */}
      {loading && <Loader />}
      {error && <Error502 />}

      {/* Main Content */}
      {!loading && !error && androidData && selectedVariant && (
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
            {/* Left Side - Main Image */}
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
                alt={androidData.model}
                width="100%"
                height="auto"
                maxHeight="50vh"
                borderRadius="md"
                boxShadow="md"
              />
              <HStack spacing={2} mt={4}>
                {androidData.media.map((image, index) => (
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

            {/* Right Side - Product Details */}
            <GridItem
              width="100%"
              mt={5}
              display="flex"
              flexDirection="column"
              alignItems="start"
              mx="auto"
            >
              <Heading as="h2" size="lg" mb={2}>
                {androidData.model}
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
                    lg: "repeat(4, 1fr)",
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

              {/* Storage Selection */}
              {selectedColor && (
                <>
                  <Text mt={6} mb={2} fontWeight="bold">
                    Select Storage:
                  </Text>
                  <HStack spacing={4} width="100%">
                    {availableStorageOptions.map((storage) => (
                      <Button
                        key={storage}
                        color="black"
                        variant={
                          selectedStorage === storage ? "solid" : "outline"
                        }
                        onClick={() => handleStorageChange(storage)}
                      >
                        {storage}
                      </Button>
                    ))}
                  </HStack>
                </>
              )}

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
      {!loading && !error && androidData && (
        <Box mt={2} p={10} borderWidth="1px" borderRadius="lg">
          <Text mt={1} fontWeight="bold" fontSize="xl">
            Features:
          </Text>
          <ul>
            {JSON.parse(androidData.features[0]).map((feature, index) => (
              <li key={index}>
                <Text mt={1}>- {feature}</Text>
              </li>
            ))}
          </ul>

          <Heading as="h3" size="md" mt={5} mb={4}>
            Device Details
          </Heading>
          <Text>
            Release Year: <strong>{androidData.releaseYear}</strong>
          </Text>
          <Text>
            Condition: <strong>{androidData.condition}</strong>
          </Text>
          <Text>
            Warranty: <strong>{androidData.warranty}</strong>
          </Text>
          <Text>
            Purchase Date: <strong>{androidData.purchaseDate}</strong>
          </Text>
          <Text>
            Age: <strong>{androidData.age}</strong>
          </Text>

          <Text mt={4} fontWeight="bold">
            Add-Ons:
          </Text>
          {androidData.addOn.length > 0 && (
            <ul>
              {androidData.addOn.map((addOn, index) => (
                <li key={index}>
                  <Text mt={1}>- {addOn}</Text>
                </li>
              ))}
            </ul>
          )}
        </Box>
      )}
    </Box>
  );
}
