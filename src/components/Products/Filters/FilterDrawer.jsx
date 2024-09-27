import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Text,
  VStack,
  HStack,
  Divider,
  Checkbox,
  Stack,
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

const FilterDrawer = ({ isOpen, onClose }) => {
  const [priceRange, setPriceRange] = React.useState([10, 500000]);
  const [batteryHealthOptions, setBatteryHealthOptions] = React.useState([]);
  const [storageOptions, setStorageOptions] = React.useState([]);
  const [ageOptions, setAgeOptions] = React.useState([]);
  const [typeOptions, setTypeOptions] = React.useState([]);

  const location = useLocation(); // Get the current route

  const handleApply = () => {
    onClose();
  };

  const handleClear = () => {
    setPriceRange([10, 500000]);
    setBatteryHealthOptions([]);
    setStorageOptions([]);
    setAgeOptions([]);
    setTypeOptions([]);
    onClose();
  };

  const handleBatteryHealthChange = (value) => {
    setBatteryHealthOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
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

  const handleTypeChange = (value) => {
    setTypeOptions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="full">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton fontSize="16px" variant="none" />
          <DrawerHeader>
            <Text fontSize="lg" fontWeight="bold" textAlign="center">
              Filter Options
            </Text>
            <Divider border="1px" mt={2} />
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="start">

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

              {/* Conditionally Render Battery Health Filter */}
              {location.pathname === "/categories/iPhone" && (
                <Box width="100%">
                  <Text fontSize="20px" fontWeight="600" my={2}>
                    Battery Health
                  </Text>
                  <Stack direction="column" spacing={3}>
                    {["80-below", "81-90", "90-95", "95-100"].map((health) => (
                      <Checkbox
                        key={health}
                        isChecked={batteryHealthOptions.includes(health)}
                        onChange={() => handleBatteryHealthChange(health)}
                      >
                        {health === "80-below"
                          ? "80% and below"
                          : health === "81-90"
                          ? "81% to 90%"
                          : health === "90-95"
                          ? "90% to 95%"
                          : "95% to 100%"}
                      </Checkbox>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Conditionally Render Storage Options (Hidden for /categories/accessory) */}
              {location.pathname !== "/categories/Accessories" && (
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
              )}

              {/* Age Filter */}
              <Box width="100%">
                <Text fontSize="20px" fontWeight="600" my={2}>
                  Age
                </Text>
                <Stack direction="column" spacing={3}>
                  {["1-3 months", "3-6 months", "6-9 months", "9 months - 1 year", "1 year above"].map((age) => (
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

              {/* Conditionally Render Type Filter */}
              {location.pathname === "/categories/Accessories" && (
                <Box width="100%">
                  <Text fontSize="20px" fontWeight="600" my={2}>
                    Type
                  </Text>
                  <Stack direction="column" spacing={3}>
                    {["charger", "case", "earbuds", "screen protector", "other"].map((type) => (
                      <Checkbox
                        key={type}
                        isChecked={typeOptions.includes(type)}
                        onChange={() => handleTypeChange(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Checkbox>
                    ))}
                  </Stack>
                </Box>
              )}

            </VStack>
          </DrawerBody>

          {/* Footer Buttons */}
          <HStack spacing={5} justifyContent="space-between" p={4}>
            <Button flex="1" variant="outline" onClick={handleClear} colorScheme="gray">
              Clear All
            </Button>
            <Button flex="1" colorScheme="blue" onClick={handleApply}>
              Apply Filters
            </Button>
          </HStack>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default FilterDrawer;
