import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Text,
  VStack,
  Input,
  Divider,
  Box,
  StackDivider,
  Collapse,
  IconButton,
  Badge,
  useToast, // Import useToast
} from "@chakra-ui/react";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchcouponData,
  selectcouponData,
  selectcouponError,
  selectcouponLoading,
} from "../../app/Slices/couponSlice";
import Loader from "../NotFound/Loader";
import Error502 from "../NotFound/Error502";

const CouponModal = ({
  isOpen,
  onClose,
  onApplyCoupon,
  appliedCoupon,
  onRemoveCoupon,
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const couponData = useSelector(selectcouponData);
  const couponError = useSelector(selectcouponError);
  const couponLoading = useSelector(selectcouponLoading);
  const [couponCode, setCouponCode] = useState("");
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    dispatch(fetchcouponData());
  }, [dispatch]);

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") return;

    const coupon = couponData.find((c) => c.code === couponCode.trim());
    if (coupon) {
      onApplyCoupon(coupon);
    } else {
    }

    setCouponCode("");
    onClose();
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  if (couponLoading) {
    return <Loader />;
  }

  if (couponError) {
    return <Error502 />;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxHeight="90vh"
        overflowY="auto"
        sx={{
          "::-webkit-scrollbar": {
            width: "6px",
            borderRadius: "20px",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "0",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            Coupons and Offers
          </Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box display="flex" alignItems="center" mb={4}>
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                flex="1"
              />
              <Button
                colorScheme="blue"
                onClick={handleApplyCoupon}
                ml={2}
                isDisabled={couponCode.trim() === ""}
              >
                Apply
              </Button>
            </Box>

            {/* Show applied coupon if exists */}
            {appliedCoupon && (
              <Box p={2} borderRadius="md" backgroundColor="green.100">
                <Text fontWeight="bold">
                  Applied Coupon: {appliedCoupon.code}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {appliedCoupon.shortDescription}
                </Text>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRemoveCoupon}
                  mt={2}
                >
                  Remove
                </Button>
              </Box>
            )}

            {/* Available Coupons Section */}
            <Box p={2} position="relative" overflowX="auto">
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
                    <Box
                      display="flex"
                      alignItems="center"
                      mb={2}
                      justifyContent="space-between"
                    >
                      <Badge
                        colorScheme="green"
                        fontSize="md"
                        p={2}
                        mr={2}
                        borderRadius="10%"
                      >
                        {coupon.code}
                      </Badge>
                      <Text
                        cursor="pointer"
                        color="blue.500"
                        onClick={() => {
                          setCouponCode(coupon.code);
                          handleApplyCoupon();
                        }}
                      >
                        APPLY
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
                          e.stopPropagation();
                          handleToggle(index);
                        }}
                        aria-label={
                          openIndex === index
                            ? "Collapse details"
                            : "Expand details"
                        }
                        ml={2}
                      />
                    </Text>
                    <Collapse in={openIndex === index}>
                      <Box pl={4} mt={1}>
                        <Text mb={1}>
                          Applicable on: {coupon.applicable.join(", ")}
                        </Text>
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CouponModal;
