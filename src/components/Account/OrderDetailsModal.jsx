import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  Box,
  Badge,
} from "@chakra-ui/react";
import TimeConversion from "../../utils/timeConversion";

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  // order not available
  if (!order) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>No order available.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="start" spacing={4}>
            {/* Order Information Section */}
            <Box p={4} borderWidth={1} borderRadius="md" width="full">
              <Text fontWeight="bold" fontSize="lg">
                Order Summary
              </Text>
              <Divider mb={2} />
              <HStack justify="space-between">
                <Text fontWeight="bold">Order Name:</Text>
                <Text>{order.productName}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Quantity:</Text>
                <Text>{order.quantity}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Amount:</Text>
                <Text>${order.amount}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Order Status:</Text>
                <Badge
                  colorScheme={
                    order.orderStatus === "Shipped" ? "green" : "yellow"
                  }
                >
                  {order.orderStatus}
                </Badge>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Order Date:</Text>
                <Text>
                  {TimeConversion.unixTimeToRealTime(order.createdOn)}
                </Text>
              </HStack>
            </Box>

            {/* Shipping Address Section */}
            <Box p={4} borderWidth={1} borderRadius="md" width="full">
              <Text fontWeight="bold" fontSize="lg">
                Shipping Address
              </Text>
              <Divider mb={2} />
              <Text fontWeight="bold">{order.shippingAddress.name}</Text>
              <Text>{order.shippingAddress.phoneNumber}</Text>
              <Text>{order.shippingAddress.email}</Text>
              <Text>{order.shippingAddress.addressLine1}</Text>
              <Text>
                {order.shippingAddress.locality}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </Text>
              <Text>{order.shippingAddress.landmark}</Text>
            </Box>

            {/* Billing Address Section */}
            <Box p={4} borderWidth={1} borderRadius="md" width="full">
              <Text fontWeight="bold" fontSize="lg">
                Billing Address
              </Text>
              <Divider mb={2} />
              <Text fontWeight="bold">{order.billingAddress.name}</Text>
              <Text>{order.billingAddress.phoneNumber}</Text>
              <Text>{order.billingAddress.email}</Text>
              <Text>{order.billingAddress.addressLine1}</Text>
              <Text>
                {order.billingAddress.locality}, {order.billingAddress.city},{" "}
                {order.billingAddress.state} - {order.billingAddress.pincode}
              </Text>
              <Text>{order.billingAddress.landmark}</Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailsModal;
