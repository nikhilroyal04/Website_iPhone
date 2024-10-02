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
  selectiPhoneData,
  fetchiPhoneData,
} from "../../app/Slices/iPhoneSlice";
import {
  selectAndroidData,
  fetchAndroidData,
} from "../../app/Slices/androidSlice";
import {
  selectAccessoryData,
  fetchAccessoryData,
} from "../../app/Slices/accessorySlice";

const SearchDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryData = useSelector(selectcategoryData);
  const categoryError = useSelector(selectcategoryError);
  const categoryLoading = useSelector(selectcategoryLoading);
  const iPhoneData = useSelector(selectiPhoneData);
  const androidData = useSelector(selectAndroidData);
  const accessoryData = useSelector(selectAccessoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [combinedResults, setCombinedResults] = useState([]);

  // Adjust size based on breakpoint
  const drawerSize = useBreakpointValue({ base: "full", lg: "lg" });

  useEffect(() => {
    dispatch(fetchcategoryData());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.length >= 4) {
      dispatch(fetchiPhoneData(searchTerm));
      dispatch(fetchAndroidData(searchTerm));
      dispatch(fetchAccessoryData(searchTerm));
    }
  }, [searchTerm, dispatch]);

  useEffect(() => {
    // Combine the data whenever iPhone, Android, or Accessory data changes
    const combinedData = [...iPhoneData, ...androidData, ...accessoryData];
    setCombinedResults(combinedData);
  }, [iPhoneData, androidData, accessoryData]);

  console.log("data", combinedResults);

  const handleClick = (category) => {
    navigate(`/categories/${category}`);
  };

  if (categoryLoading) {
    return <Loader />;
  }

  if (categoryError) {
    return <Error502 />;
  }

  if (categoryLoading && categoryData.length === 0) {
    return <NoData />;
  }

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
                  placeholder="What are you looking for?"
                  size="lg"
                  mb={4}
                  variant="outline"
                  pl="10"
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                {searchTerm && (
                  <Text fontSize="2xl" fontWeight="800">
                    Search Results
                  </Text>
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
