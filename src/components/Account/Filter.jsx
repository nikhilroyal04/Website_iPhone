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

export default function Filter({
  isOpen,
  onClose,
  onFilterChange,
  selectedFilter,
}) {
  // This will ensure the modal closes on radio change
  const handleRadioChange = (value) => {
    onClose(); 
    onFilterChange(value); 
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
              <VStack spacing={4} align="start">
                <Radio value="all">All Orders</Radio>
                <Radio value="completed">Completed Orders</Radio>
                <Radio value="active">Active Orders</Radio>
                <Radio value="failed">Failed Orders</Radio>
              </VStack>
            </RadioGroup>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
