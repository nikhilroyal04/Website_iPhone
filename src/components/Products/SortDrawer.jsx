import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Radio,
  RadioGroup,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";

const SortDrawer = ({ isOpen, onClose }) => {
  const [sortValue, setSortValue] = React.useState("featured");

  const handleSortChange = (value) => {
    setSortValue(value);
  };

  const handleApply = () => {
    onClose();
  };

  const handleClear = () => {
    setSortValue("featured");
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton fontSize="16px" variant="none" />
          <DrawerHeader>
            <Text fontSize="2xl" fontWeight="800" textAlign="center">
              Sort
            </Text>
            <Divider border="1px" mt={2} />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="start">
              <RadioGroup onChange={handleSortChange} value={sortValue}>
                <VStack spacing={2} align="start">
                  <Radio value="featured">Featured</Radio>
                  <Radio value="price-asc">Price: Low to High</Radio>
                  <Radio value="price-desc">Price: High to Low</Radio>
                  <Radio value="newest">Newest</Radio>
                </VStack>
              </RadioGroup>
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

export default SortDrawer;
