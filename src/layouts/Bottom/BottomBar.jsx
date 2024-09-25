import React from "react";
import {
  Box,
  Button,
  Icon,
  Text,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { SlHome } from "react-icons/sl";
import { BsCart } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";
import SortDrawer from "../../components/Products/SortDrawer";
import FilterDrawer from "../../components/Products/FilterDrawer";

const BottomBar = () => {
  const [activeButton, setActiveButton] = React.useState("home");
  const location = useLocation();
  const navigate = useNavigate();

  const sortDrawer = useDisclosure();
  const filterDrawer = useDisclosure();

  const handleButtonClick = (buttonName, path) => {
    setActiveButton(buttonName);
    navigate(path);
  };

  const isCategoriesRoute = location.pathname.startsWith("/categories/");
  const isSpecialRoute =
    location.pathname === "/categories" || location.pathname === "/account";

  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        width="100%"
        bg="white"
        color="black"
        py={2}
        boxShadow="0px -4px 8px rgba(0, 0, 0, 0.05)"
        display={{ base: "flex", lg: "none" }}
        justifyContent={
          isCategoriesRoute
            ? "space-around"
            : isSpecialRoute
            ? "center"
            : "space-around"
        }
        alignItems="center"
        px={4}
      >
        {isCategoriesRoute ? (
          <HStack spacing={0} width="100%">
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<LuArrowUpDown />}
              color={activeButton === "sort" ? "blue.600" : "black"}
              onClick={sortDrawer.onOpen}
            >
              Sort
            </Button>
            <Button
              flex="1"
              variant="ghost"
              leftIcon={<CiFilter />}
              color={activeButton === "filters" ? "blue.600" : "black"}
              onClick={filterDrawer.onOpen}
            >
              Filters
            </Button>
          </HStack>
        ) : isSpecialRoute ? (
          <HStack spacing={8}>
            <Button
              leftIcon={<SlHome />}
              variant="ghost"
              borderRadius="40px"
              bg={activeButton === "home" ? "gray.100" : "none"}
              color={activeButton === "home" ? "blue.600" : "black"}
              onClick={() => handleButtonClick("home", "/")}
            >
              Home
            </Button>
            <Button
              leftIcon={<BsCart />}
              variant="ghost"
              borderRadius="40px"
              bg={activeButton === "cart" ? "gray.100" : "none"}
              color={activeButton === "cart" ? "blue.600" : "black"}
              onClick={() => handleButtonClick("cart", "/bag")}
            >
              Cart
            </Button>
            <Button
              leftIcon={<FaUser />}
              variant="ghost"
              borderRadius="40px"
              bg={activeButton === "account" ? "gray.100" : "none"}
              color={activeButton === "account" ? "blue.600" : "black"}
              onClick={() => handleButtonClick("account", "/account")}
            >
              Account
            </Button>
          </HStack>
        ) : (
          <>
            <Button
              variant="link"
              color={activeButton === "home" ? "blue.600" : "black"}
              _hover={{ textDecoration: "none", color: "blue.600" }}
              onClick={() => handleButtonClick("home", "/")}
            >
              <VStack spacing={1} align="center">
                <Icon
                  as={SlHome}
                  boxSize={6}
                  color={activeButton === "home" ? "blue.600" : "black"}
                />
                <Text
                  fontSize="sm"
                  color={activeButton === "home" ? "blue.600" : "black"}
                >
                  Home
                </Text>
              </VStack>
            </Button>
            <Button
              variant="link"
              color={activeButton === "shop" ? "blue.600" : "black"}
              _hover={{ textDecoration: "none", color: "blue.600" }}
              onClick={() => handleButtonClick("shop", "/categories")}
            >
              <VStack spacing={1} align="center">
                <Icon
                  as={BsCart}
                  boxSize={6}
                  color={activeButton === "shop" ? "blue.600" : "black"}
                />
                <Text
                  fontSize="sm"
                  color={activeButton === "shop" ? "blue.600" : "black"}
                >
                  Shop
                </Text>
              </VStack>
            </Button>
            <Button
              variant="link"
              color={activeButton === "bag" ? "blue.600" : "black"}
              _hover={{ textDecoration: "none", color: "blue.600" }}
              onClick={() => handleButtonClick("bag", "/bag")}
            >
              <VStack spacing={1} align="center">
                <Icon
                  as={BsCart}
                  boxSize={6}
                  color={activeButton === "bag" ? "blue.600" : "black"}
                />
                <Text
                  fontSize="sm"
                  color={activeButton === "bag" ? "blue.600" : "black"}
                >
                  Bag
                </Text>
              </VStack>
            </Button>
            <Button
              variant="link"
              color={activeButton === "account" ? "blue.600" : "black"}
              _hover={{ textDecoration: "none", color: "blue.600" }}
              onClick={() => handleButtonClick("account", "/account")}
            >
              <VStack spacing={1} align="center">
                <Icon
                  as={AiOutlineUser}
                  boxSize={6}
                  color={activeButton === "account" ? "blue.600" : "black"}
                />
                <Text
                  fontSize="sm"
                  color={activeButton === "account" ? "blue.600" : "black"}
                >
                  Account
                </Text>
              </VStack>
            </Button>
          </>
        )}
      </Box>
      {/* Sort Drawer */}
      <SortDrawer isOpen={sortDrawer.isOpen} onClose={sortDrawer.onClose} />
      <FilterDrawer
        isOpen={filterDrawer.isOpen}
        onClose={filterDrawer.onClose}
      />{" "}
    </>
  );
};

export default BottomBar;
