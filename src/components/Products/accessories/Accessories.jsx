import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Select,
  Grid,
  VStack,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Image,
  Divider,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAccessoryData,
  selectAccessoryError,
  selectAccessoryLoading,
  fetchAccessoryData,
  selectTotalPages,
} from "../../../app/Slices/accessorySlice";
import NoData from "../../NotFound/NoData";
import Error502 from "../../NotFound/Error502";
import Loader from "../../NotFound/Loader";
import Dummy from "../../../assets/images/Dummy.jpg";

export default function Product() {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessoryData = useSelector(selectAccessoryData);
  const accessoryError = useSelector(selectAccessoryError);
  const accessoryLoading = useSelector(selectAccessoryLoading);
  const totalPages = useSelector(selectTotalPages);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAccessoryData());
  }, [dispatch]);

  if (accessoryLoading) {
    return <Loader />;
  }

  if (accessoryError) {
    return <Error502 />;
  }

  if (accessoryLoading || accessoryData.length === 0) {
    return <NoData />;
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFirstPage = () => handlePageChange(1);
  const handleLastPage = () => handlePageChange(totalPages);
  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const renderPaginationButtons = () => {
    const pages = [];

    if (currentPage > 2) {
      pages.push(
        <Button key="first" onClick={handleFirstPage}>
          First
        </Button>
      );
    }

    if (currentPage > 1) {
      pages.push(
        <Button key="prev" onClick={handlePrevPage}>
          Previous
        </Button>
      );
    }

    const pageRange = 3;
    let startPage = Math.max(1, currentPage - pageRange);
    let endPage = Math.min(totalPages, currentPage + pageRange);

    if (startPage > 1) {
      pages.push(
        <Button key="1" onClick={() => handlePageChange(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        pages.push(<Text key="dots1">...</Text>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          colorScheme={i === currentPage ? "teal" : undefined}
          disabled={i === currentPage}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<Text key="dots2">...</Text>);
      }
      pages.push(
        <Button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Button>
      );
    }

    if (currentPage < totalPages) {
      pages.push(
        <Button key="next" onClick={handleNextPage}>
          Next
        </Button>
      );
    }

    if (totalPages > 2) {
      pages.push(
        <Button key="last" onClick={handleLastPage}>
          Last
        </Button>
      );
    }

    return pages;
  };

  return (
    <Box p={8} mt={16}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories">Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href={`/categories/${name}`}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Category Heading and Sort By Dropdown */}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={{ base: "wrap", lg: "nowrap" }} // Wrap on small screens
      >
        <Text fontSize="4xl" fontWeight="800">
          {name.charAt(0).toUpperCase() + name.slice(1)} Products (
          {accessoryData.length})
        </Text>
        <Flex display={{ base: "none", lg: "flex" }} alignItems="center">
          <Text fontSize="15px" fontWeight="800" mr={5} my="auto">
            Sort by:
          </Text>
          <Select placeholder="Sort by" width="200px" borderRadius="10px">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </Select>
        </Flex>
      </Box>

      {/* Filters and Product Grid */}
      <Box display={{ base: "block", lg: "flex" }} mt={6}>
        <Box
          width={{ base: "100%", lg: "30%" }}
          pr={4}
          display={{ base: "none", lg: "block" }}
        >
          <Text fontWeight="bold" mb={2}>
            Filters
          </Text>
          <Divider border="1px" mb={3} />
          <Text mb={1}>Price</Text>
          {/* Add range slider or price inputs */}
          <Text mb={1}>Color</Text>
          {/* Add color options */}
          <Text mb={1}>Warranty</Text>
          {/* Add warranty options */}
        </Box>
        <Box width={{ base: "100%", lg: "70%" }}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {accessoryData.map((accessory) => (
              <VStack
                key={accessory._id}
                spacing={3}
                align="start"
                p={4}
                borderRadius="md"
                position="relative"
                cursor="pointer"
                role="group"
              >
                {/* Wrapper for image and hover button */}
                <Box position="relative" w="full">
                  <Image
                    src={accessory.media[0] || Dummy}
                    alt={accessory.name}
                    boxSize="full"
                    objectFit="cover"
                    transition="all 0.3s ease"
                    borderRadius="md"
                  />
                  {/* Add to Cart button, initially hidden */}
                  <Button
                    variant="none"
                    position="absolute"
                    bottom="4"
                    left="50%"
                    transform="translateX(-50%)"
                    bg="#323232"
                    color="white"
                    borderRadius="10px"
                    width="90%"
                    opacity={0}
                    transition="opacity 0.3s ease"
                    _groupHover={{ opacity: 1 }}
                  >
                    Add to Cart
                  </Button>
                </Box>
                <Text fontWeight="semibold">
                  {accessory.name}- {accessory.variants[0].color}
                </Text>
                <Text fontSize="lg" color="blue.600">
                  ₹{accessory.variants[0].price}
                  {accessory.variants[0].originalPrice && (
                    <Text
                      as="span"
                      textDecoration="line-through"
                      ml={2}
                      color="gray"
                    >
                      ₹{accessory.variants[0].originalPrice || "N/A"}
                    </Text>
                  )}
                  {accessory.variants[0].priceOff && (
                    <Text as="span" color="red.500" ml={2}>
                      ({accessory.variants[0].priceOff || "0%"} off)
                    </Text>
                  )}
                </Text>
              </VStack>
            ))}
          </Grid>
        </Box>
      </Box>
      {accessoryData.length >= 20 && (
        <HStack spacing={4} justifyContent="center" mt={6}>
          {renderPaginationButtons()}
        </HStack>
      )}
    </Box>
  );
}
