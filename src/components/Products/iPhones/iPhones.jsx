import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchiPhoneData,
  selectIPhoneData,
  selectIPhoneError,
  selectIPhoneLoading,
  selectIPhoneTotalPages,
} from "../../../app/Slices/productSlice";
import { selectSortOption, setSortOption } from "../../../app/Slices/sortSlice";
import NoData from "../../NotFound/NoData";
import Error502 from "../../NotFound/Error502";
import Loader from "../../NotFound/Loader";
import Dummy from "../../../assets/images/Dummy.jpg";
import { useAddToCart } from "../../../utils/cartUtils";
import {
  saveFilters,
  clearFilters,
  selectSavedFilters,
} from "../../../app/Slices/filterSlice";

export default function iPhones() {
  const { addToCart } = useAddToCart();
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const iPhoneData = useSelector(selectIPhoneData);
  const iPhoneError = useSelector(selectIPhoneError);
  const iPhoneLoading = useSelector(selectIPhoneLoading);
  const totalPages = useSelector(selectIPhoneTotalPages);
  const sortOption = useSelector(selectSortOption);
  const savedFilters = useSelector(selectSavedFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const [priceRange, setPriceRange] = useState([10, 500000]);
  const [batteryHealthOptions, setBatteryHealthOptions] = useState([]);
  const [storageOptions, setStorageOptions] = useState([]);
  const [ageOptions, setAgeOptions] = useState([]);

  // Function to derive combined battery health range
  const getCombinedBatteryHealthRange = (selectedRanges) => {
    if (selectedRanges.length === 0) return "";

    const min = Math.min(
      ...selectedRanges.map((range) => parseInt(range.split("-")[0]))
    );
    const max = Math.max(
      ...selectedRanges.map((range) => parseInt(range.split("-")[1]))
    );

    return `${min}-${max}`;
  };

  const getAgeValue = (selectedAges) => {
    const ageValues = {
      "1-3 months": 1,
      "3-6 months": 6,
      "6-9 months": 9,
      "9-12 months": 12,
      "1 year above": 60,
    };

    // Get the maximum age value from the selected options
    let maxAgeValue = null;

    selectedAges.forEach((age) => {
      const value = ageValues[age];
      if (value !== undefined) {
        if (maxAgeValue === null || value > maxAgeValue) {
          maxAgeValue = value;
        }
      }
    });

    return maxAgeValue;
  };

  useEffect(() => {
    // On component mount, set filters from saved filters
    if (savedFilters) {
      setPriceRange(savedFilters.priceRange || [10, 500000]);
      setBatteryHealthOptions(savedFilters.batteryHealth || []);
      setStorageOptions(savedFilters.storage || []);
      setAgeOptions(savedFilters.age || []);
    }
  }, [savedFilters]);

  useEffect(() => {
    const storageQuery = storageOptions.join(",");
    const batteryHealthQuery =
      getCombinedBatteryHealthRange(batteryHealthOptions);
    const ageQuery = getAgeValue(ageOptions);

    dispatch(
      saveFilters({
        priceRange,
        batteryHealth: batteryHealthOptions,
        storage: storageOptions,
        age: ageOptions,
      })
    );

    dispatch(
      fetchiPhoneData(1, priceRange, storageQuery, batteryHealthQuery, ageQuery)
    );
  }, [dispatch, priceRange, storageOptions, batteryHealthOptions, ageOptions]);

  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
    setCurrentPage(1);
  };

  // Sort data based on the selected sort option
  const sortedData = () => {
    let sortedVariants = [...iPhoneData];
    if (sortOption === "price-asc") {
      sortedVariants.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sortedVariants.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      sortedVariants.sort(
        (a, b) => new Date(b.createdOn) - new Date(a.createdOn)
      );
    }
    return sortedVariants;
  };

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

  const handleClear = () => {
    setPriceRange([10, 500000]);
    setBatteryHealthOptions([]);
    setStorageOptions([]);
    setAgeOptions([]);
  };

  const handleBatteryHealthChange = (range) => {
    setBatteryHealthOptions((prev) => {
      if (prev.includes(range)) {
        return prev.filter((item) => item !== range);
      } else {
        return [...prev, range];
      }
    });
  };

  const handleStorageChange = (value) => {
    setStorageOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleAgeChange = (value) => {
    setAgeOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleItemClick = (id) => {
    navigate(`/categories/iPhone/${id}`);
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
          {sortedData().length})
        </Text>
        <Flex display={{ base: "none", lg: "flex" }} alignItems="center">
          <Text fontSize="15px" fontWeight="800" mr={5} my="auto">
            Sort by:
          </Text>
          <Select
            placeholder="Sort by"
            width="200px"
            borderRadius="10px"
            value={sortOption}
            onChange={handleSortChange}
          >
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
          {/* Filters Heading with Clear Button */}
          <HStack justifyContent="space-between" mb={2}>
            <Text fontWeight="bold">Filters</Text>
            <Button size="sm" variant="outline" onClick={handleClear}>
              Clear All
            </Button>
          </HStack>
          <Divider border="1px" mb={3} />

          {/* Price Range Filter */}
          <Box width="100%">
            <Text fontSize="20px" fontWeight="600" my={2}>
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
            </Text>
            <RangeSlider
              aria-label={["min", "max"]}
              defaultValue={priceRange}
              min={10}
              max={500000}
              step={100}
              onChange={(val) => setPriceRange(val)}
            >
              <RangeSliderTrack bg="gray.200">
                <RangeSliderFilledTrack bg="blue.500" />
              </RangeSliderTrack>
              <RangeSliderThumb boxSize={6} index={0} />
              <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
          </Box>

          {/* Battery Health Filter (Only for iPhone category) */}
          {location.pathname === "/categories/iPhone" && (
            <VStack alignItems="stretch" spacing={2} mt={4}>
              <Text fontWeight="bold">Battery Health</Text>
              <Stack pl={2} spacing={2}>
                <Checkbox
                  isChecked={batteryHealthOptions.includes("95-100")}
                  onChange={() => handleBatteryHealthChange("95-100")}
                >
                  95% - 100%
                </Checkbox>
                <Checkbox
                  isChecked={batteryHealthOptions.includes("90-95")}
                  onChange={() => handleBatteryHealthChange("90-95")}
                >
                  90% - 95%
                </Checkbox>
                <Checkbox
                  isChecked={batteryHealthOptions.includes("85-90")}
                  onChange={() => handleBatteryHealthChange("85-90")}
                >
                  85% - 90%
                </Checkbox>
                <Checkbox
                  isChecked={batteryHealthOptions.includes("80-85")}
                  onChange={() => handleBatteryHealthChange("80-85")}
                >
                  80% - 85%
                </Checkbox>
                <Checkbox
                  isChecked={batteryHealthOptions.includes("0-80")}
                  onChange={() => handleBatteryHealthChange("0-80")}
                >
                  Below 80%
                </Checkbox>
              </Stack>
            </VStack>
          )}

          {/* Storage Options Filter */}
          <Box width="100%">
            <Text fontSize="20px" fontWeight="600" my={2}>
              Storage Options
            </Text>
            <Stack direction="column" spacing={3}>
              {["64GB", "128GB", "256GB", "512GB", "1TB"].map((size) => (
                <Checkbox
                  key={size}
                  isChecked={storageOptions.includes(size)}
                  onChange={() => handleStorageChange(size)}
                >
                  {size}
                </Checkbox>
              ))}
            </Stack>
          </Box>

          {/* Age Filter */}
          <Box width="100%">
            <Text fontSize="20px" fontWeight="600" my={2}>
              Age
            </Text>
            <Stack direction="column" spacing={3}>
              {[
                "1-3 months",
                "3-6 months",
                "6-9 months",
                "9 months - 1 year",
                "1 year above",
              ].map((age) => (
                <Checkbox
                  key={age}
                  isChecked={ageOptions.includes(age)}
                  onChange={() => handleAgeChange(age)}
                >
                  {age}
                </Checkbox>
              ))}
            </Stack>
          </Box>
        </Box>
        <Box width={{ base: "100%", lg: "70%" }}>
          {/* Loading or Error State */}
          {iPhoneLoading ? (
            <Loader /> // Show loader only within the product grid
          ) : iPhoneError ? (
            <Error502 /> // Show error only within the product grid
          ) : iPhoneData.length === 0 ? (
            <NoData /> // Handle empty data case
          ) : (
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap={6}
            >
              {sortedData().map((iPhoneData, index) => (
                <VStack
                  key={`${iPhoneData.model}-${iPhoneData.storage}-${index}`}
                  spacing={3}
                  align="start"
                  p={4}
                  borderRadius="md"
                  position="relative"
                  cursor="pointer"
                  role="group"
                  onClick={() => handleItemClick(iPhoneData._id)}
                >
                  {/* Wrapper for image and hover button */}
                  <Box position="relative" w="full">
                    <Image
                      src={iPhoneData.media[0] || Dummy}
                      alt={iPhoneData.model}
                      boxSize="full"
                      height="350px"
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
                      onClick={(e) => {
                        e.stopPropagation();
                        const cartItem = {
                          productId: iPhoneData._id,
                          name: iPhoneData.model,
                          color: iPhoneData.color,
                          storageOption: iPhoneData.storage,
                          price: iPhoneData.price,
                          originalPrice: iPhoneData.originalPrice,
                          priceOff: iPhoneData.priceOff,
                          quantity: 1,
                          media: iPhoneData.media[0]
                            ? iPhoneData.media[0]
                            : Dummy,
                        };
                        addToCart(cartItem);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                  <Text fontWeight="semibold">{`${iPhoneData.model} - ${iPhoneData.storage}, ${iPhoneData.color}`}</Text>
                  {/* Display price and details */}
                  <Text fontSize="lg" color="blue.600">
                    ₹{iPhoneData.price}
                    <Text
                      as="span"
                      textDecoration="line-through"
                      ml={2}
                      color="gray"
                    >
                      ₹{iPhoneData.originalPrice || "N/A"}
                    </Text>
                    <Text as="span" color="red.500" ml={2}>
                      ({iPhoneData.priceOff || "0%"}% off)
                    </Text>
                  </Text>
                </VStack>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
      {iPhoneData.length >= 20 && (
        <HStack spacing={4} justifyContent="center" mt={6}>
          {renderPaginationButtons()}
        </HStack>
      )}
    </Box>
  );
}
