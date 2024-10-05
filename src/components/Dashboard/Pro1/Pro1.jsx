import React, { useEffect } from "react";
import { Box, Text, Grid, Image, VStack, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../NotFound/NoData";
import Error502 from "../../NotFound/Error502";
import Loader from "../../NotFound/Loader";
import Dummy from "../../../assets/images/Dummy.jpg";
import { useAddToCart } from "../../../utils/cartUtils";
import {
  fetchiPhoneData,
  selectIPhoneData,
  selectIPhoneError,
  selectIPhoneLoading,
} from "../../../app/Slices/productSlice";

const Pro1 = () => {
  const { addToCart } = useAddToCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const iPhoneData = useSelector(selectIPhoneData);
  const iPhoneError = useSelector(selectIPhoneError);
  const iPhoneLoading = useSelector(selectIPhoneLoading);

  useEffect(() => {
    dispatch(fetchiPhoneData());
  }, [dispatch]);

  if (iPhoneLoading) {
    return <Loader />;
  }

  if (iPhoneError) {
    return <Error502 />;
  }

  if (!iPhoneLoading && iPhoneData.length === 0) {
    return <NoData />;
  }

  const handleItemClick = (id) => {
    navigate(`/categories/iPhone/${id}`);
  };

  return (
    <Box bg="gray.50" p={4}>
      <Text fontSize="4xl" fontWeight="bold" mb={6} textAlign="center">
        Find your iPhone
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
        {iPhoneData.map((iPhone) => {
          // Use the first image from media[] if available, otherwise use placeholder
          const imageUrl = iPhone.media.length > 0 ? iPhone.media[0] : Dummy;

          const cartItem = {
            productId: iPhone._id,
            name: iPhone.model,
            color: iPhone.color,
            storageOption: iPhone.storage,
            price: iPhone.price,
            originalPrice: iPhone.originalPrice,
            priceOff: iPhone.priceOff,
            quantity: 1,
            media: imageUrl,
          };

          return (
            <VStack
              key={iPhone._id}
              spacing={3}
              align="start"
              p={4}
              borderRadius="md"
              position="relative"
              className="card"
              cursor="pointer"
              role="group"
              onClick={() => handleItemClick(iPhone._id)}
            >
              {/* Wrapper for image and hover button */}
              <Box position="relative" w="full">
                <Image
                  src={imageUrl || Dummy}
                  alt={`Product ${iPhone.model}`}
                  boxSize="full"
                  objectFit="cover"
                  height="350px"
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
              <Text fontWeight="semibold">{`${iPhone.model} - ${
                iPhone.storage
              }, ${
                iPhone.color.length > 0 ? JSON.parse(iPhone.color[0]) : "N/A"
              }`}</Text>
              <Text fontSize="lg" color="blue.600">
                ₹{iPhone.price}
                {iPhone.originalPrice && (
                  <Text
                    as="span"
                    textDecoration="line-through"
                    ml={2}
                    color="gray"
                  >
                    ₹{iPhone.originalPrice}
                  </Text>
                )}
                {iPhone.priceOff && (
                  <Text as="span" color="red.500" ml={2}>
                    ({iPhone.priceOff}% off)
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

export default Pro1;
