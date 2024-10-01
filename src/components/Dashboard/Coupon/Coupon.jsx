import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  StackDivider,
  useBreakpointValue,
  IconButton,
  Divider,
  Collapse,
  useToast,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  selectcouponData,
  selectcouponError,
  selectcouponLoading,
  fetchcouponData,
} from "../../../app/Slices/couponSlice";
import Loader from "../../NotFound/Loader";
import Error502 from "../../NotFound/Error502";

const Coupon = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const couponData = useSelector(selectcouponData);
  const couponError = useSelector(selectcouponError);
  const couponLoading = useSelector(selectcouponLoading);

  useEffect(() => {
    dispatch(fetchcouponData());
  }, [dispatch]);

  // Adjust padding based on breakpoint
  const padding = useBreakpointValue({ base: "4", md: "6" });

  // State for managing which coupon's details are open
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        toast({
          title: "Coupon code copied.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to copy code.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Failed to copy code: ", err);
      });
  };

  if (couponError) {
    return <Error502 />;
  }

  if (couponLoading) {
    return <Loader />;
  }

  return (
    <Box p={padding} position="relative" overflowX="auto">
      <Text fontSize="lg" mb={1}>
        Available Coupons
      </Text>
      <Divider py="1.5px" bg="black" width="20%" />
      <VStack
        spacing={4}
        align="stretch"
        mt={5}
        divider={<StackDivider borderColor="gray.200" />}
      >
        {couponData.map((coupon, index) => (
          <Box key={index} p={4} borderRadius="md" lineHeight="1.1">
            <Box display="flex" alignItems="center" mb={1}>
              <Text fontWeight="bold" flex="1">
                {coupon.code}
              </Text>
              <Text cursor="pointer" onClick={() => handleCopy(coupon.code)}>
                COPY CODE
              </Text>
            </Box>
            <Text mb={2} color="red" fontSize="15px">
              {coupon.shortDescription}
            </Text>
            <Text mb={2} fontSize="15px">
              {coupon.longDescription}
            </Text>
            <Text
              mt={2}
              display="flex"
              alignItems="center"
              onClick={() => handleToggle(index)}
              cursor="pointer"
            >
              Details
              <IconButton
                variant="none"
                color="gray.600"
                icon={
                  openIndex === index ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )
                }
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click from affecting the text click handler
                  handleToggle(index);
                }}
                aria-label={
                  openIndex === index ? "Collapse details" : "Expand details"
                }
                ml={2}
              />
            </Text>
            <Collapse in={openIndex === index}>
              <Box pl={4} mt={1}>
                <Text mb={1}>
                  Applicable on: {coupon.applicable.join(", ")}{" "}
                  {/* Join applicable methods */}
                </Text>
              </Box>
            </Collapse>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Coupon;
