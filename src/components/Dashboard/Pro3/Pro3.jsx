import React, { useEffect } from "react";
import { Box, Text, Grid, Image, VStack, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAccessoriesData,
  selectAccessoriesError,
  selectAccessoriesLoading,
  fetchAccessoriesData,
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
  const AccessoryData = useSelector(selectAccessoriesData);
  const AccessoryError = useSelector(selectAccessoriesError);
  const AccessoryLoading = useSelector(selectAccessoriesLoading);

  useEffect(() => {
    dispatch(fetchAccessoriesData());
  }, [dispatch]);

  if (AccessoryLoading) {
    return <Loader />;
  }

  if (AccessoryError) {
    return <Error502 />;
  }

  if (AccessoryLoading && AccessoryData.length === 0) {
    return <NoData />;
  }

  const handleItemClick = (id) => {
    navigate(`/categories/Accessories/${id}`);
  };

  return (
    <Box p={4} bg="gray.50">
      <Text fontSize="4xl" fontWeight="bold" mb={6} textAlign="center">
        Looking for accessories
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
        {AccessoryData.map((Accessory) => {
          // Use the first image from media[] if available, otherwise use a placeholder image
          const imageUrl =
            Accessory.media.length > 0 ? Accessory.media[0] : Dummy;

          const cartItem = {
            productId: Accessory._id,
            model: Accessory.model,
            color: Accessory.color,
            storageOption: "N/A",
            price: Accessory.price,
            originalPrice: Accessory.originalPrice,
            priceOff: Accessory.priceOff,
            quantity: 1,
            media: imageUrl,
          };

          return (
            <VStack
              key={Accessory._id}
              spacing={3}
              align="start"
              p={4}
              borderRadius="md"
              position="relative"
              className="card"
              cursor="pointer"
              role="group"
              onClick={() => handleItemClick(Accessory._id)}
            >
              {/* Wrapper for image and hover button */}
              <Box position="relative" w="full">
                <Image
                  src={imageUrl || Dummy}
                  alt={`Product ${Accessory.name}`}
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
              <Text fontWeight="semibold">{`${Accessory.model}- ${
                Accessory.color.length > 0
                  ? JSON.parse(Accessory.color[0])
                  : "N/A"
              }`}</Text>
              <Text fontSize="lg" color="blue.600">
                ₹{Accessory.price}
                {Accessory.originalPrice && (
                  <Text
                    as="span"
                    textDecoration="line-through"
                    ml={2}
                    color="gray"
                  >
                    ₹{Accessory.originalPrice}
                  </Text>
                )}
                {Accessory.priceOff && (
                  <Text as="span" color="red.500" ml={2}>
                    ({Accessory.priceOff}% off)
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
