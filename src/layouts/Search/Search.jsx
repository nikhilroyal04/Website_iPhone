import React, { useEffect, useState } from "react";
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
  useBreakpointValue,
  Icon,
  Grid,
  Button,
  Image,
  Flex,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectcategoryData,
  selectcategoryError,
  selectcategoryLoading,
  fetchcategoryData,
} from "../../app/Slices/categorySlice";
import NoData from "../../components/NotFound/NoData";
import Error502 from "../../components/NotFound/Error502";
import Loader from "../../components/NotFound/Loader";
import Dummy from "../../assets/images/Dummy.jpg";
import {
  selectAllProductsData,
  selectAllProductsLoading,
  selectAllProductsError,
  fetchAllProductsData,
} from "../../app/Slices/productSlice";
import Fetch201 from "../../components/NotFound/Fetch201";

const SearchDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryData = useSelector(selectcategoryData);
  const categoryError = useSelector(selectcategoryError);
  const categoryLoading = useSelector(selectcategoryLoading);
  const productData = useSelector(selectAllProductsData);
  const productLoading = useSelector(selectAllProductsLoading);
  const productError = useSelector(selectAllProductsError);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  // Adjust size based on breakpoint
  const drawerSize = useBreakpointValue({ base: "full", lg: "lg" });

  useEffect(() => {
    dispatch(fetchAllProductsData());
    dispatch(fetchcategoryData());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.length >= 4) {
      setIsLoadingSearch(true);
      dispatch(fetchAllProductsData(1, searchTerm));
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    setIsLoadingSearch(false);
  }, [productData]);

  const handleClick = (category) => {
    navigate(`/categories/${category}`);
    onClose();
  };

  // if (categoryLoading) {
  //   return <Loader />;
  // }

  if (categoryError) {
    return <Error502 />;
  }

  if (!categoryLoading && categoryData.length === 0) {
    return <NoData />;
  }

  const handleView = (id, categoryName) => {
    navigate(`/categories/${categoryName}/${id}`);
    onClose();
    setSearchTerm("");
  };

  // Reset search term when drawer closes
  const handleDrawerClose = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleDrawerClose}
      size={drawerSize}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton fontSize={20} mt={2} mr={5} />
          <DrawerHeader>
            <Text fontSize="3xl" fontWeight="800" mb={5}>
              Search
            </Text>
            <Box>
              <InputGroup mb={4}>
                <InputLeftElement>
                  <Icon as={SearchIcon} color="gray.500" fontSize="xl" mt={2} />
                </InputLeftElement>
                <Input
                  placeholder="What are you looking for?"
                  size="lg"
                  variant="outline"
                  pl="10"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </InputGroup>
            </Box>
          </DrawerHeader>
          <DrawerBody
            overflowY="auto"
            sx={{
              "::-webkit-scrollbar": {
                width: "6px",
                borderRadius: "20px",
              },
              "::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "0",
              },
              "::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            <VStack spacing={4} align="stretch">
              <Box>
                {searchTerm && (
                  <Box>
                    {isLoadingSearch ? (
                      <Fetch201 />
                    ) : productData.length === 0 ? (
                      <Text
                        fontSize="xl"
                        textAlign="center"
                        justifyContent="center"
                        color="red"
                      >
                        No results found. Try again...
                      </Text> // No results found
                    ) : (
                      productData.map((result) => (
                        <Box key={result._id} mb={6}>
                          {/* Loop through variants */}
                          <Box
                            key={result._id}
                            p={4}
                            mb={4}
                            borderWidth="1px"
                            borderRadius="lg"
                            boxShadow="lg"
                            transition="0.2s ease"
                            _hover={{ shadow: "xl", borderColor: "blue.300" }}
                            cursor="pointer"
                            onClick={() =>
                              handleView(result._id, result.categoryName)
                            }
                          >
                            {/* Flex container for Model/Color on the left and View Details on the right */}
                            <Flex justify="space-between" align="center">
                              <Box>
                                <Text fontSize="md" fontWeight="600">
                                  {result.model || result.name} -{" "}
                                  {(result.color)}
                                </Text>
                                <Text fontSize="md" color="gray.600">
                                  Storage: {result.storage}
                                </Text>
                              </Box>

                              {/* View Details Button */}
                              <Box textAlign="right">
                                <Flex>
                                  <Text
                                    as="span"
                                    color="blue.500"
                                    fontWeight="bold"
                                    mr={1}
                                    cursor="pointer"
                                  >
                                    View in Details
                                  </Text>
                                  <Text as="span" color="blue.500">
                                    {/* Diagonal arrow icon */}
                                    <svg
                                      width="16"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M17 7L7 17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M7 7H17V17"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Text>
                                </Flex>
                              </Box>
                            </Flex>
                          </Box>
                        </Box>
                      ))
                    )}
                  </Box>
                )}
              </Box>

              {/* Hide top categories grid when there is a search term */}
              {!searchTerm && (
                <>
                  <Text fontSize="2xl" fontWeight="800">
                    Top Categories
                  </Text>
                  <Box>
                    <Grid
                      templateColumns={{
                        base: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                      }}
                      gap={6}
                    >
                      {categoryData.map((category, index) => (
                        <Box
                          key={index}
                          position="relative"
                          overflow="hidden"
                          _hover={{ ".hover-content": { opacity: 1 } }}
                          onClick={() => handleClick(category.name)}
                          cursor="pointer"
                        >
                          <Image
                            src={category.categoryImage || Dummy}
                            alt={category.name}
                            boxSize="100%"
                            objectFit="cover"
                          />
                          <Box
                            className="hover-content"
                            position="absolute"
                            top="80%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            opacity={0}
                            transition="opacity 0.3s ease"
                            p={4}
                            borderRadius="md"
                            textAlign="center"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent click event from bubbling up
                              handleClick(category.name);
                            }}
                          >
                            <Button
                              color="white"
                              bg="black"
                              _hover={{ bg: "gray.800" }}
                              maxW="100%"
                              size="xs"
                              fontSize="xs"
                              px={4}
                              py={4}
                            >
                              View More {category.name}
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default SearchDrawer;
