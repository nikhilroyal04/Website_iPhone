import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { SearchIcon } from "@chakra-ui/icons";
import Logo from "../Logo/Logo";
import Sidebar from "../Sidebar/Sidebar";
import { BiMenuAltLeft } from "react-icons/bi";
import SearchDrawer from "../Search/Search";
import {
  getCartItemsByUserId,
  selectcartData,
} from "../../app/Slices/cartSlice";
import { selectUser } from "../../app/Slices/authSlice";

// Helper function to retrieve anonymous cart items from localStorage
const getAnonymousCart = () => {
  const storedCart = localStorage.getItem("anonymousCart");
  return storedCart ? JSON.parse(storedCart) : { items: [] };
};

const Header = () => {
  const cartItems = useSelector(selectcartData);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anonymousCartItems, setAnonymousCartItems] = useState([]);
  const [items, setItems] = useState(0); // State to track the number of cart items

  const userId = user ? user._id : null;

  useEffect(() => {
    if (userId) {
      // Fetch cart items from backend if user is logged in
      dispatch(getCartItemsByUserId(userId));
    } else {
      // Get anonymous cart items from localStorage if user is not logged in
      const storedAnonymousCart = getAnonymousCart();
      setAnonymousCartItems(storedAnonymousCart.items);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Function to update the number of items
    const updateItems = () => {
      if (userId) {
        setItems(cartItems?.items?.length || 0);
      } else {
        const storedAnonymousCart = getAnonymousCart();
        setItems(storedAnonymousCart.items.length || 0);
      }
    };

    // Update items immediately on component mount
    updateItems();

    // Set interval to update items every second
    const intervalId = setInterval(updateItems, 100);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [cartItems, userId]);

  const {
    isOpen: isSearchDrawerOpen,
    onOpen: onSearchDrawerOpen,
    onClose: onSearchDrawerClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThanMd] = useMediaQuery("(max-width: 992px)");

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
                alignItems="center"
                onClick={handleClick}
                bg="white"
                cursor="pointer"
                ml={isSmallerThanMd ? 0 : "320"}
                mx="auto"
              >
                <Text fontSize="2xl" my={2} fontWeight="600" mr={1}>
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
                  Cart ({items})
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
