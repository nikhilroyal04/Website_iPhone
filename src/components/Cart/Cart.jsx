import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  Stack,
  VStack,
  HStack,
  Divider,
  Select,
  Badge,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import Other from "./Other";
import {
  selectcartData,
  selectcartError,
  selectcartLoading,
  getCartItemsByUserId,
  deleteCartItem,
} from "../../app/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Loader from "../NotFound/Loader";
import Error502 from "../NotFound/Error502";
import Dummy from "../../assets/images/Dummy.jpg";
import CouponModal from "./CouponModal";
import { useNavigate } from "react-router-dom";

// Helper functions for handling localStorage cart
const getAnonymousCart = () => {
  const storedCart = localStorage.getItem("anonymousCart");
  return storedCart ? JSON.parse(storedCart) : { items: [] };
};

const setAnonymousCart = (cartData) => {
  localStorage.setItem("anonymousCart", JSON.stringify(cartData));
};

const Cart = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  const dispatch = useDispatch();
  const cartData = useSelector(selectcartData);
  const cartError = useSelector(selectcartError);
  const cartLoading = useSelector(selectcartLoading);

  const [isCouponModalOpen, setCouponModalOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [anonymousCart, setAnonymousCartState] = useState(getAnonymousCart());

  // Retrieve user information from cookies
  const user = Cookies.get("user");
  const userId = user ? JSON.parse(user)._id : null;

  // Fetch cart based on user status (logged in or anonymous)
  useEffect(() => {
    if (userId) {
      dispatch(getCartItemsByUserId(userId));
    } else {
      // Handle anonymous user cart
      const storedAnonymousCart = getAnonymousCart();
      setAnonymousCartState(storedAnonymousCart);
    }
  }, [dispatch, userId]);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalSavings = items.reduce(
      (acc, item) => acc + (item.originalPrice - item.price) * item.quantity,
      0
    );

    let discountAmount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === "flat") {
        discountAmount = appliedCoupon.discountValue;
      } else if (appliedCoupon.discountType === "percentage") {
        discountAmount = (totalAmount * appliedCoupon.discountValue) / 100;
      }
    }

    return {
      totalAmount: totalAmount - discountAmount,
      totalSavings,
      discountAmount,
    };
  };

  console.log(anonymousCart.items);

  useEffect(() => {
    const cartItems = userId ? cartData.items : anonymousCart.items;
    const { totalAmount, totalSavings, discountAmount } =
      calculateTotal(cartItems);
    setTotalAmount(totalAmount);
    setTotalSavings(totalSavings);
    setDiscountAmount(discountAmount);
  }, [cartData.items, anonymousCart.items, appliedCoupon, userId]);

  if (cartLoading) {
    return <Loader />;
  }

  // if (cartError) {
  //   return <Error502 />;
  // }

  const cartItems = userId ? cartData.items : anonymousCart.items || [];

  if (cartItems.length === 0) {
    return (
      <Box
        p={5}
        mt={24}
        width="100%"
        mb={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          Your cart is empty.
        </Text>
        <Button
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate("/categories")}
        >
          Go to Shop
        </Button>
      </Box>
    );
  }

  const originalTotal = parseFloat(
    cartItems
      .reduce((acc, item) => {
        const price = parseFloat(item.originalPrice);
        return acc + (isNaN(price) ? 0 : price);
      }, 0)
      .toFixed(2) // Round to 2 decimal places
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
    );
    // dispatch(updateCart(updatedItems)); // Uncomment this if you implement an updateCart action
  };

  const handleApplyCoupon = (coupon) => {
    const cartTotal = totalAmount + discountAmount;
    if (validateCoupon(coupon, cartTotal)) {
      setAppliedCoupon(coupon);
      toast({
        title: "Coupon applied successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Coupon is not valid or does not meet the requirements.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setCouponModalOpen(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast({
      title: "Coupon removed successfully!",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const validateCoupon = (coupon, cartTotal) => {
    const currentDate = new Date();
    const expiryDate = new Date(coupon.expiryDate);
    const isActive = coupon.status === "Active";
    const hasRedemptionsAvailable =
      Number(coupon.currentRedemptions) < Number(coupon.maxRedemptions);
    const meetsMinimumPurchase = cartTotal >= Number(coupon.minimumPurchase);

    return (
      isActive &&
      hasRedemptionsAvailable &&
      expiryDate > currentDate &&
      meetsMinimumPurchase
    );
  };

  const PaymentSummary = (
    <VStack align="stretch" spacing={1} w={isSmallScreen ? "100%" : "40%"}>
      <Box borderWidth="1px" p={4} borderRadius="md" boxShadow="sm" bg="white">
        <VStack align="stretch" spacing={2}>
          <Box>
            <HStack
              justifyContent="space-between"
              onClick={() => setCouponModalOpen(true)}
              cursor="pointer"
            >
              <Text fontSize="md" fontWeight="semibold">
                Coupons and offers
              </Text>
              <Text fontSize="md" fontWeight="semibold" color="blue.500">
                {appliedCoupon ? "1 Applied" : "2 Offers"}
                <ChevronRightIcon fontSize={20} />
              </Text>
            </HStack>
            <Text fontSize="sm" color="green.500">
              Save your money for next time.
            </Text>
          </Box>
        </VStack>
      </Box>

      <Box mt={4} />

      <Box borderWidth="1px" p={4} borderRadius="md" boxShadow="sm" bg="white">
        <VStack align="stretch" spacing={4}>
          <VStack align="stretch" spacing={2}>
            <HStack justify="space-between">
              <Text>Item total</Text>
              <HStack spacing={2}>
                <Text as="s" color="gray.500">
                  ₹{originalTotal}
                </Text>
                <Text>₹{totalAmount + discountAmount}</Text>{" "}
                {/* Total before discount */}
              </HStack>
            </HStack>
            <HStack justify="space-between">
              <Text>Delivery fee</Text>
              <Text color="green.500">FREE</Text>
            </HStack>
            <Divider />
            <HStack justify="space-between" fontWeight="semibold">
              <Text>Grand total</Text>
              <Text>₹{totalAmount}</Text> {/* Total after discount */}
            </HStack>
            <Text fontSize="sm" color="gray.500">
              Inclusive of all taxes
            </Text>
          </VStack>
          <Divider />

          <Text fontSize="sm" color="gray.500">
            Average delivery time: 3-5 days
          </Text>
          <Box p={2} borderRadius="5px" textAlign="center" bg="green.100">
            <Text fontSize="sm" color="black.500">
              {discountAmount > 0
                ? `You saved ₹${discountAmount} more on this order`
                : `(₹${
                    originalTotal - totalAmount
                  }) saved so far on this order`}
            </Text>
          </Box>
          <Divider />

          <Button mt={2} colorScheme="blue" size="lg" w="full">
            Continue
          </Button>
        </VStack>
      </Box>
    </VStack>
  );

  const handleDelete = (userId, productId, variantId) => {
    if (userId) {
      dispatch(deleteCartItem({ userId, productId, variantId }));
    } else {
      // Handle removing the item from the anonymous cart
      const updatedCart = anonymousCart.items.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId)
      );
      const newCart = { ...anonymousCart, items: updatedCart };
      setAnonymousCartState(newCart); // Update local state
      setAnonymousCart(newCart);
    }
  };

  return (
    <>
      <Box p={5} mt={16} maxW="80vw" mx="auto" mb={10}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Shopping Cart ({cartItems.length} Items)
        </Text>

        <Stack direction={isSmallScreen ? "column" : "row"} spacing={6}>
          <Box w={isSmallScreen ? "100%" : "60%"}>
            <Stack spacing={6}>
              {cartItems.length === 0 ? (
                <Flex
                  height="40vh"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  flexDirection="column"
                >
                  <Image src={Dummy} alt="Empty Cart" boxSize="150px" />
                  <Text fontSize="lg">Your cart is empty.</Text>
                  <Text>Please add items to the cart.</Text>
                </Flex>
              ) : (
                cartItems.map((item) => (
                  <Box
                    key={item._id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="sm"
                    bg="white"
                  >
                    <Flex justify="space-between" align="center">
                      <HStack>
                        <Image
                          src={item.media || Dummy}
                          alt={item.name}
                          boxSize="100px"
                        />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="semibold" fontSize="lg">
                            {item.name}
                          </Text>
                          <HStack>
                            <Text as="s" color="gray.500">
                              ₹{item.originalPrice}
                            </Text>
                            <Text color="green.500">
                              ₹{item.price} ({item.priceOff} off)
                            </Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.500">
                            You saved ₹{item.originalPrice - item.price}
                          </Text>
                          <Flex>
                            <Select
                              size="sm"
                              defaultValue={item.storageOption}
                              w="100px"
                            >
                              <option value="64GB">64GB</option>
                              <option value="128GB">128GB</option>
                              <option value="256GB">256GB</option>
                              <option value="512GB">512GB</option>
                            </Select>
                            <Select
                              size="sm"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item._id, e.target.value)
                              }
                              w="60px"
                              ml={2}
                            >
                              {[...Array(5).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Select>
                          </Flex>
                        </VStack>
                      </HStack>
                      <Button
                        variant="outline"
                        colorScheme="red"
                        size="sm"
                        onClick={() =>
                          handleDelete(userId, item.productId, item.variantId)
                        }
                      >
                        Remove
                      </Button>
                    </Flex>
                  </Box>
                ))
              )}
            </Stack>
          </Box>

          {!isSmallScreen && cartItems.length > 0 && PaymentSummary}
        </Stack>
      </Box>

      <Other />

      {isSmallScreen && cartItems.length > 0 && (
        <Box p={5} maxW="90vw" mx="auto">
          {PaymentSummary}
        </Box>
      )}

      <CouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setCouponModalOpen(false)}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        appliedCoupon={appliedCoupon}
      />
    </>
  );
};

export default Cart;
