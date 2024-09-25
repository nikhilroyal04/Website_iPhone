import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link,
  VStack,
  Flex,
  Text,
  DrawerFooter,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaInstagram } from "react-icons/fa"; 

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Flex
            align="center"
            px={4}
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            pb={2}
          >
            <DrawerCloseButton />
            {/* Close button at the start */}
            <Text fontSize="lg" fontWeight="600" textAlign="center" flex="1">
              Menu
            </Text>
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={4} align="start" mt={1}>
            <Text as={RouterLink} to="/account" fontSize="md" fontWeight="600">
              Account
            </Text>
            <Text
              as={RouterLink}
              to="/privacy-policy"
              fontSize="md"
              fontWeight="600"
            >
              Privacy Policy
            </Text>
            <Text
              as={RouterLink}
              to="/refund-policy"
              fontSize="md"
              fontWeight="600"
            >
              Refund Policy
            </Text>
            <Text as={RouterLink} to="/terms" fontSize="md" fontWeight="600">
              Terms & Conditions
            </Text>
          </VStack>
        </DrawerBody>
        <Divider bg="gray.200" />
        <DrawerFooter>
          <Flex justify="center" align="center" w="full">
            <Icon as={FaInstagram} boxSize={6} /> {/* Instagram icon */}
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
