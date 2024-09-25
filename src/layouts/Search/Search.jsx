import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Box,
  Text,
  VStack,
  Divider,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const topCategories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Toys",
];

const SearchDrawer = ({ isOpen, onClose }) => {
  // Adjust size based on breakpoint
  const drawerSize = useBreakpointValue({ base: "full", lg: "lg" });

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={drawerSize}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton fontSize={20} mt={2} mr={5} />
          <DrawerHeader>
            <Text fontSize="3xl" fontWeight="800">
              Search
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Box position="relative">
                <Input
                  placeholder="What are you looking for ?"
                  size="lg"
                  mb={4}
                  variant="outline"
                  pl="10"
                />
                <Icon
                  as={SearchIcon}
                  position="absolute"
                  top="40%"
                  left="3"
                  transform="translateY(-50%)"
                  color="gray.500"
                  fontSize="xl"
                />
              </Box>
              <Text fontSize="2xl" fontWeight="800">
                Top Categories
              </Text>
              <Box>
                {topCategories.map((category, index) => (
                  <Box key={index} mb={2}>
                    <Text fontSize="md">{category}</Text>
                  </Box>
                ))}
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default SearchDrawer;
