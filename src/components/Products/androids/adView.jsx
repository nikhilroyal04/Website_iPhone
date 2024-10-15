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
  selectAndroidError,
  selectAndroidLoading,
} from "../../../app/Slices/productSlice";
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";
import Dummy from "../../../assets/images/Dummy.jpg";
import { useAddToCart } from "../../../utils/cartUtils";

export default function AdView() {
  const { addToCart } = useAddToCart();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const androidData = useSelector(selectProductById);
  const loading = useSelector(selectAndroidLoading);
  const error = useSelector(selectAndroidError);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setMainImage(androidData?.media[0] || Dummy); // Default main image
  }, [androidData]);

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  const convertAge = (months) => {
    if (months > 24) {
      return `2+ years`;
    } else if (months > 12) {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years > 1 ? "s" : ""}${
        remainingMonths
          ? ` ${remainingMonths} month${remainingMonths > 1 ? "s" : ""}`
          : ""
      }`;
    }
    return `${months} month${months > 1 ? "s" : ""}`;
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
      {!loading && !error && androidData && (
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
                Price: <strong>₹{androidData.price}</strong>
              </Text>
              <Text as="s" fontSize="md" color="gray.500">
                Original Price: ₹{androidData.originalPrice}
              </Text>
              <Text fontSize="md" color="red.500">
                {androidData.priceOff}% Off
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
                  {JSON.parse(androidData.color).map((color) => (
                    <Button key={color} variant="solid">
                      {color}
                    </Button>
                  ))}
                </Grid>
              </HStack>
              {/* Storage Selection */}
              <>
                <Text mt={6} mb={2} fontWeight="bold">
                  Select Storage:
                </Text>
                <HStack spacing={4} width="100%">
                  <Button color="black" variant="solid">
                    {androidData.storage}
                  </Button>
                </HStack>
              </>
              <Flex mt={6}>
                <Text fontWeight="bold" mr={2} fontSize="lg">
                  Quantity:
                </Text>
                <Select
                  size="sm"
                  value={quantity}
                  w="60px"
                  ml={2}
                  isDisabled={androidData.quantity == 0}
                >
                  {[...Array(Math.min(5, androidData.quantity)).keys()].map(
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
                {androidData?.quantity === 0 ? (
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
                          productId: androidData._id,
                          name: androidData.model,
                          color: JSON.parse(androidData.color[0]),
                          storageOption: androidData.storage,
                          price: androidData.price,
                          originalPrice: androidData.originalPrice,
                          priceOff: androidData.priceOff,
                          quantity: quantity,
                          media: androidData.media[0],
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
      {!loading && !error && androidData && (
        <Box mt={2} p={10} borderWidth="1px" borderRadius="lg" boxShadow="md">
          <Text mt={1} fontWeight="bold" fontSize="2xl" color="teal.600">
            Features:
          </Text>
          <ul>
            {JSON.parse(androidData.features[0]).map((feature, index) => (
              <Box
                key={index}
                p={3}
                bg={index % 2 === 0 ? "gray.50" : "gray.100"}
                borderRadius="md"
                mt={2}
              >
                <Text mt={1}>- {feature}</Text>
              </Box>
            ))}
          </ul>

          <Heading as="h3" size="md" mt={6} mb={4} color="blue.500">
            Device Details
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
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
              Repaired: <strong>{JSON.parse(androidData.repaired)}</strong>
            </Text>
            <Text>
              Age: <strong>{convertAge(androidData.age)}</strong>
            </Text>
          </Grid>

          <Text mt={6} fontWeight="bold" fontSize="xl" color="purple.600">
            Add-Ons:
          </Text>
          {androidData.addOn[0].length > 0 && (
            <ul>
              {JSON.parse(androidData.addOn[0]).map((addOn, index) => (
                <Box
                  key={index}
                  p={3}
                  bg={index % 2 === 0 ? "yellow.50" : "yellow.100"}
                  borderRadius="md"
                  mt={2}
                >
                  <Text mt={1}>- {addOn}</Text>
                </Box>
              ))}
            </ul>
          )}
        </Box>
      )}
    </Box>
  );
}
