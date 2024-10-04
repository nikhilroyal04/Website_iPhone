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
  Divider,
  Flex,
  Select,
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
import Dummy from "../../../assets/images/Dummy.jpg";
import { useAddToCart } from "../../../utils/cartUtils";

export default function AcView() {
  const { addToCart } = useAddToCart();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const accessoryData = useSelector(selectAccessoryById);
  const loading = useSelector(selectAccessoryLoading);
  const error = useSelector(selectAccessoryError);

  useEffect(() => {
    dispatch(fetchAccessoryById(id));
  }, [dispatch, id]);

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
    setQuantity(1);
    setMainImage(accessoryData.media[0] || Dummy); // Reset main image on color change
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (value) => {
    const selectedQuantity = parseInt(value);
    if (selectedQuantity <= selectedVariant.quantity && selectedQuantity <= 5) {
      setQuantity(selectedQuantity);
    }
  };

  // Get unique colors for the selected color
  const uniqueColors = Array.from(
    new Set(accessoryData?.variants.map((variant) => variant.color))
  );

  return (
    <Box p={8} mt={14}>
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

              <Flex mt={6}>
                <Text fontWeight="bold" mr={2} fontSize="lg">
                  Quantity:
                </Text>
                <Select
                  size="sm"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  w="60px"
                  ml={2}
                  isDisabled={selectedVariant.quantity === 0}
                >
                  {[...Array(Math.min(5, selectedVariant.quantity)).keys()].map(
                    (x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    )
                  )}
                </Select>
              </Flex>

              {/* Add to Cart & Buy Now Buttons */}
              <HStack spacing={4} mt={6} width="100%">
                {selectedVariant?.quantity === 0 ? (
                  <Text fontSize="lg" color="red.500" fontWeight="bold">
                    Sold Out
                  </Text>
                ) : (
                  <>
                    <Button
                      colorScheme="teal"
                      size="lg"
                      width="100%"
                      onClick={(e) => {
                        e.stopPropagation();
                        const cartItem = {
                          productId: accessoryData._id,
                          variantId: selectedVariant._id,
                          name: accessoryData.name,
                          color: selectedColor,
                          storageOption: "N/A",
                          price: selectedVariant.price,
                          originalPrice: selectedVariant.originalPrice,
                          priceOff: selectedVariant.priceOff,
                          quantity: quantity,
                          media: accessoryData.media[0],
                        };
                        addToCart(cartItem);
                      }}
                    >
                      Add to Cart
                    </Button>
                    <Button colorScheme="yellow" size="lg" width="100%">
                      Buy Now
                    </Button>
                  </>
                )}
              </HStack>
            </GridItem>
          </Grid>
        </Box>
      )}

      <Divider mt={5} />

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
