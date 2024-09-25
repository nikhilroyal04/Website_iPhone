import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import Logo from "../Logo/Logo";
import Sidebar from "../Sidebar/Sidebar";
import { BiMenuAltLeft } from "react-icons/bi";
import SearchDrawer from "../Search/Search";

const Header = () => {
  const {
    isOpen: isSearchDrawerOpen,
    onOpen: onSearchDrawerOpen,
    onClose: onSearchDrawerClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThanMd] = useMediaQuery("(max-width: 992px)");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Box
        bg="white"
        px={isSmallerThanMd ? "2" : "8"}
        py={isSmallerThanMd ? 2 : 4}
        borderBottom="1px"
        borderColor="gray.200"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000} // Ensure the header stays on top of other content
      >
        <Flex
          h={isSmallerThanMd ? "8" : "10"}
          alignItems="center"
          justifyContent="space-between"
        >
          {isSmallerThanMd ? (
            <>
              <IconButton
                aria-label="Open Menu"
                icon={<BiMenuAltLeft fontSize={25} />}
                variant="ghost"
                onClick={onOpen}
                display={{ base: "flex", lg: "none" }}
              />
              <Sidebar isOpen={isOpen} onClose={onClose} />
              <Flex
                mx="auto"
                align="center"
                whiteSpace="nowrap"
                onClick={handleClick}
                cursor="pointer"
              >
                <Text fontSize="xl" my={2} fontWeight="600">
                  Guru's
                </Text>{" "}
                <Logo />
              </Flex>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon fontSize={20} />}
                variant="ghost"
                onClick={onSearchDrawerOpen}
                display={{ base: "flex", lg: "none" }}
              />
            </>
          ) : (
            <Flex
              alignItems="center"
              justifyContent="space-between"
              overflowX="auto"
              whiteSpace="nowrap"
              w="full"
            >
              <Flex align="center" flexShrink={0} w="20%">
                <HStack spacing={6} alignItems="center">
                  <Text
                    as={RouterLink}
                    to="/privacy-policy"
                    fontSize="md"
                    fontWeight="600"
                    color="gray.800"
                  >
                    Privacy Policy
                  </Text>
                  <Text
                    as={RouterLink}
                    to="/refund-policy"
                    fontSize="md"
                    fontWeight="600"
                    color="gray.800"
                  >
                    Refund Policy
                  </Text>
                  <Text
                    as={RouterLink}
                    to="/terms_and_condition"
                    fontSize="md"
                    fontWeight="600"
                    color="gray.800"
                  >
                    Terms & Conditions
                  </Text>
                </HStack>
              </Flex>

              <Flex
                align="center"
                flex="1"
                onClick={handleClick}
                bg="white"
                cursor="pointer"
                ml={isSmallerThanMd ? 0 : "320"}
              >
                <Text fontSize="2xl" my={2} fontWeight="600" mr={3}>
                  Guru's
                </Text>
                <Logo width="auto" height="40px" />
              </Flex>

              <HStack spacing={6} alignItems="center">
                <Text
                  fontSize="md"
                  fontWeight="600"
                  color="blue.600"
                  cursor="pointer"
                  onClick={onSearchDrawerOpen}
                >
                  Search
                </Text>
                <Text
                  as={RouterLink}
                  to="/bag"
                  fontSize="md"
                  fontWeight="600"
                  color="blue.600"
                >
                  Cart (1)
                </Text>
              </HStack>
            </Flex>
          )}
        </Flex>
      </Box>
      <SearchDrawer isOpen={isSearchDrawerOpen} onClose={onSearchDrawerClose} />
    </>
  );
};

export default Header;
