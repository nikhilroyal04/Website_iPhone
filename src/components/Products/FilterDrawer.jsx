import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";

const FilterDrawer = ({ isOpen, onClose }) => {
  const handleApply = () => {
    onClose();
  };

  const handleClear = () => {
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton fontSize="16px" variant="none" />
          <DrawerHeader>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              Filter
            </Text>
            <Divider border="1px" mt={2} />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              <Text
                align="center"
                fontSize="20px"
                fontWeight="600"
                width="100%"
                my={2}
              >
                Color
              </Text>
              <Text
                align="center"
                fontSize="20px"
                fontWeight="600"
                width="100%"
                my={2}
              >
                Price Range
              </Text>
              <Text
                align="center"
                fontSize="20px"
                fontWeight="600"
                width="100%"
                my={2}
              >
                Warranty
              </Text>
              {/* Add more filter options as needed */}
            </VStack>
          </DrawerBody>
          <HStack spacing={5} justifyContent="space-between" p={4}>
            <Button
              flex="1"
              variant="outline"
              onClick={handleClear}
              colorScheme="gray"
            >
              Clear All
            </Button>
            <Button flex="1" colorScheme="blue" onClick={handleApply}>
              Apply
            </Button>
          </HStack>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default FilterDrawer;
