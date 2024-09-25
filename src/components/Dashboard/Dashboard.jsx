import React from "react";
import ImageSlider from "./Slider/Slider";
import Category from "./Category/Category";
import Coupon from "./Coupon/Coupon";
import Pro1 from "./Pro1/Pro1";
import Pro2 from "./Pro2/Pro2";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
} from "@chakra-ui/react";

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ImageSlider />
      <Category />

      {/* Coupon Sidebar Button */}
      <Box
        position="fixed"
        right="-10px"
        bottom="30%"
        zIndex={10}
        display={{ base: "none", md: "block" }}
        p={2}
        bg="black"
        color="white"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        cursor="pointer"
        onClick={onOpen}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100px"
          width="20px"
          transform="rotate(-90deg)"
          marginLeft="12px"
          cursor="pointer"
        >
          <Text fontSize="lg" fontWeight="bold" mb={6}>
            %{""}Offers
          </Text>
        </Box>
      </Box>

      {/* Sidebar Drawer for Coupon */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Coupon and Offers{" "}
            <IconButton
              aria-label="Close"
              icon={<CloseIcon />}
              position="absolute"
              top="10px"
              right="10px"
              onClick={onClose}
              variant="ghost"
            />
          </DrawerHeader>
          {/* <DrawerBody> */}
          <Coupon />
          {/* </DrawerBody> */}
        </DrawerContent>
      </Drawer>
      <Pro1/>
      <Pro2/>
    </>
  );
}
