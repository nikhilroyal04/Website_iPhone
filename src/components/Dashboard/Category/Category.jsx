import React, { useEffect } from "react";
import { Box, Grid, Image, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectcategoryData,
  selectcategoryError,
  selectcategoryLoading,
  fetchcategoryData,
} from "../../../app/Slices/categorySlice";
import NoData from "../../NotFound/NoData";
import Error502 from "../../NotFound/Error502";
import Loader from "../../NotFound/Loader";
import Dummy from "../../../assets/images/Dummy.jpg";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryData = useSelector(selectcategoryData);
  const categoryError = useSelector(selectcategoryError);
  const categoryLoading = useSelector(selectcategoryLoading);

  useEffect(() => {
    dispatch(fetchcategoryData());
  }, [dispatch]);

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
    <Box p={6} display={{ base: "inline", lg: "flex" }} width="90vw">
      {/* Title Section */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mr={10}
        mb={5}
      >
        <Text fontSize="4xl" fontWeight="800">
          Categories
        </Text>
      </Box>

      {/* Grid of Images */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
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
              <Button color="white" bg="black" _hover={{ bg: "gray.800" }}>
                View More {category.name}
              </Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
