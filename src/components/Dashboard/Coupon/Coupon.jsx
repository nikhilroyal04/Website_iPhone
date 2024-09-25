import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  StackDivider,
  useBreakpointValue,
  IconButton,
  Divider,
  Collapse,
  useToast,
} from "@chakra-ui/react";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdContentCopy,
} from "react-icons/md";

const Coupon = () => {
  const toast = useToast();

  // Example coupon data
  const coupons = [
    {
      code: "SUMMER20",
      description: "20% off on summer collection",
      additionalDescription: "Enjoy 20% off on all summer items.",
      details: ["Applicable on COD", "Applicable on UPI"],
    },
    {
      code: "WELCOME10",
      description: "10% off on your first purchase",
      additionalDescription: "Welcome! Get 10% off on your first order.",
      details: ["Applicable on all orders"],
    },
    {
      code: "FREESHIP",
      description: "Free shipping on orders over $50",
      additionalDescription: "No shipping charges for orders above $50.",
      details: ["Applicable on orders above $50"],
    },
  ];

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
          // description: `The code ${code} has been copied to your clipboard.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Failed to copy code.",
          // description: "There was an error copying the coupon code.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Failed to copy code: ", err);
      });
  };

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
        {coupons.map((coupon, index) => (
          <Box key={index} p={4} borderRadius="md" lineHeight="1.1">
            <Box display="flex" alignItems="center" mb={1}>
              <Text fontWeight="bold" flex="1" >
                {coupon.code}
              </Text>
              <Text cursor="pointer" onClick={() => handleCopy(coupon.code)}>
                COPY CODE
              </Text>
            </Box>
            <Text mb={2} color="red" fontSize="15px">
              {coupon.description}
            </Text>
            <Text mb={2} fontSize="15px">
              {coupon.additionalDescription}
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
                {coupon.details.slice(0, 1).map((detail, detailIndex) => (
                  <Text key={detailIndex} mb={1}>
                    • {detail}
                  </Text>
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Coupon;
