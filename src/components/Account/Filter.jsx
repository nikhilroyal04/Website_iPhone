import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  IconButton,
  VStack,
  Text,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const orderStatuses = [
  "Pending",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
  "Refunded",
];

export default function Filter({
  isOpen,
  onClose,
  onFilterChange,
  selectedFilter,
}) {
  const handleRadioChange = (value) => {
    onFilterChange(value); // Trigger filter change
    onClose(); // Close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <HStack justify="space-between">
            <Text>Filter</Text>
            <IconButton
              icon={<CloseIcon />}
              onClick={onClose}
              aria-label="Close filter"
              variant="none"
            />
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={3} align="left" mb={5}>
            <RadioGroup onChange={handleRadioChange} value={selectedFilter}>
              <VStack spacing={3} align="start">
                {/* Render Radio buttons with order statuses */}
                <Radio value="all">All Orders</Radio>{" "}
                {/* Add All Orders radio */}
                {orderStatuses.map((status) => (
                  <Radio key={status} value={status}>
                    All {status} orders
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
