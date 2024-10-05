import React, { useEffect } from "react";
import { Box, Text, Grid, Image, VStack, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAndroidData,
  selectAndroidData,
  selectAndroidError,
  selectAndroidLoading,
} from "../../../app/Slices/productSlice";
import NoData from "../../NotFound/NoData";
import Error502 from "../../NotFound/Error502";
import Loader from "../../NotFound/Loader";
import Dummy from "../../../assets/images/Dummy.jpg";
import { useAddToCart } from "../../../utils/cartUtils";

const Pro2 = () => {
  const { addToCart } = useAddToCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const androidData = useSelector(selectAndroidData);
  const androidError = useSelector(selectAndroidError);
  const androidLoading = useSelector(selectAndroidLoading);

  useEffect(() => {
    dispatch(fetchAndroidData());
  }, [dispatch]);

  if (androidLoading) {
    return <Loader />;
  }

  if (androidError) {
    return <Error502 />;
  }

  if (!androidLoading && androidData.length === 0) {
    return <NoData />;
  }

  const handleItemClick = (id) => {
    navigate(`/categories/Android/${id}`);
  };

  return (
    <Box p={4}>
      <Text fontSize="4xl" fontWeight="bold" mb={6} textAlign="center">
        Explore Androids
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
        {androidData.map((android) => {
          // Use the first image from media[] if available, otherwise use a placeholder image
          const imageUrl = android.media.length > 0 ? android.media[0] : Dummy;

          const cartItem = {
            productId: android._id,
            name: android.model,
            color: android.color,
            storageOption: android.storage,
            price: android.price,
            originalPrice: android.originalPrice,
            priceOff: android.priceOff,
            quantity: 1,
            media: imageUrl,
          };

          return (
            <VStack
              key={android._id}
              spacing={3}
              align="start"
              p={4}
              borderRadius="md"
              position="relative"
              className="card"
              cursor="pointer"
              role="group"
              onClick={() => handleItemClick(android._id)}
            >
              {/* Wrapper for image and hover button */}
              <Box position="relative" w="full">
                <Image
                  src={imageUrl || Dummy}
                  alt={`Product ${android.model}`}
                  boxSize="full"
                  height="350px"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(cartItem);
                  }}
                >
                  Add to Cart
                </Button>
              </Box>
              <Text fontWeight="semibold">{`${android.model} - ${
                android.storage
              }, ${
                android.color.length > 0 ? JSON.parse(android.color[0]) : "N/A"
              }`}</Text>
              <Text fontSize="lg" color="blue.600">
                ₹{android.price}
                {android.originalPrice && (
                  <Text
                    as="span"
                    textDecoration="line-through"
                    ml={2}
                    color="gray"
                  >
                    ₹{android.originalPrice}
                  </Text>
                )}
                {android.priceOff && (
                  <Text as="span" color="red.500" ml={2}>
                    ({android.priceOff}% off)
                  </Text>
                )}
              </Text>
            </VStack>
          );
        })}
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

export default Pro2;
