import React, { useEffect } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  Image,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { IoArrowForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  selectcategoryData,
  selectcategoryError,
  selectcategoryLoading,
  fetchcategoryData,
} from "../../../app/Slices/categorySlice";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../NotFound/NoData";
import Error502 from "../../NotFound/Error502";
import Loader from "../../NotFound/Loader";
import Dummy from "../../../assets/images/Dummy.jpg";


export default function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryData = useSelector(selectcategoryData);
  const categoryError = useSelector(selectcategoryError);
  const categoryLoading = useSelector(selectcategoryLoading);

  useEffect(() => {
    dispatch(fetchcategoryData());
  }, [dispatch]);

  const handleClick = (name) => {
    // Navigate to the specific category page
    navigate(`/categories/${name}`);
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
    <Box mt={16} p={8} mb={3}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            _active={{ color: "gray.800" }}
            _hover={{ color: "gray.600" }}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/categories"
            _active={{ color: "gray.800" }}
            _hover={{ color: "gray.600" }}
          >
            Shop
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Shop Heading */}
      <Text fontSize="40px" mt={4} mb={5} fontWeight="800">
        Shop
      </Text>

      {/* Image Grid */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }}
        spacing={6}
        p={2}
      >
        {categoryData.map((category) => (
          <Box
            key={category._id}
            position="relative"
            overflow="hidden"
            cursor="pointer"
            onClick={() => handleClick(category.name)}
            borderRadius="md"
            _hover={{ borderRadius: "15px" }}
            role="group"
          >
            <Image
              src={category.categoryImage || Dummy}
              alt={category.name}
              boxSize="100%"
              objectFit="cover"
            />
            <Box
              position="absolute"
              top="90%"
              left="50%"
              transform="translate(-50%, -50%)"
              opacity={0}
              transition="opacity 0.3s ease"
              p={4}
              borderRadius="md"
              textAlign="center"
              _hover={{ opacity: 1 }}
              _groupHover={{ opacity: 1 }}
            >
              <Button
                color="white"
                bg="black"
                _hover={{ bg: "gray.800" }}
                rightIcon={<IoArrowForward />}
              >
                View More {category.name}{" "}
                {/* Button text based on category title */}
              </Button>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
