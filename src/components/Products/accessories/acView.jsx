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
  fetchProductById,
  selectProductById,
  selectAccessoriesError,
  selectAccessoriesLoading,
} from "../../../app/Slices/productSlice";
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";
import Dummy from "../../../assets/images/Dummy.jpg";
import { useAddToCart } from "../../../utils/cartUtils";

export default function AcView() {
  const { id } = useParams();
  const { addToCart } = useAddToCart();
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const accessoryData = useSelector(selectProductById);
  const loading = useSelector(selectAccessoriesLoading);
  const error = useSelector(selectAccessoriesError);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setMainImage(accessoryData?.media[0] || Dummy); // Set default main image
  }, [accessoryData]);

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (value) => {
    const selectedQuantity = parseInt(value);
    if (selectedQuantity <= selectedVariant.quantity && selectedQuantity <= 5) {
      setQuantity(selectedQuantity);
    }
  };

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
              {accessoryData.model}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>

      {/* Loading and Error Handling */}
      {loading && <Loader />}
      {error && <Error502 />}

      {/* Main Content */}
      {!loading && !error && accessoryData && (
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
                alt={accessoryData.model}
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
                {accessoryData.model}
              </Heading>

              {/* Price Section */}
              <Text fontSize="xl" color="green.500">
                Price: <strong>₹{accessoryData.price}</strong>
              </Text>
              <Text as="s" fontSize="md" color="gray.500">
                Original Price: ₹{accessoryData.originalPrice}
              </Text>
              <Text fontSize="md" color="red.500">
                {accessoryData.priceOff}% Off
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
                  {JSON.parse(accessoryData.color).map((color) => (
                    <Button key={color} variant="outline">
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
                  isDisabled={accessoryData.quantity === 0}
                >
                  {[...Array(Math.min(5, accessoryData.quantity)).keys()].map(
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
                {accessoryData?.quantity === 0 ? (
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
                          name: accessoryData.model,
                          color: JSON.parse(accessoryData.color[0]),
                          storageOption: "N/A",
                          price: accessoryData.price,
                          originalPrice: accessoryData.originalPrice,
                          priceOff: accessoryData.priceOff,
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
