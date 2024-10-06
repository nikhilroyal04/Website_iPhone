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
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import {
  saveFilters,
  clearFilters,
  selectSavedFilters,
} from "../../../app/Slices/filterSlice"; // Adjust the import path accordingly

const FilterDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  // Select filter state from the Redux store
  const { priceRange, batteryHealth, storage, age, type } = useSelector(selectSavedFilters); // Ensure `type` is part of your state

  const location = useLocation();

  const handleApply = () => {
    // Dispatch the saveFilters action with current state
    dispatch(saveFilters({ priceRange, batteryHealth, storage, age, type }));
    onClose();
  };

  const handleClear = () => {
    dispatch(clearFilters());
    onClose();
  };

  const handlePriceRangeChange = (val) => {
    dispatch(saveFilters({ priceRange: val, batteryHealth, storage, age, type }));
  };

  const handleBatteryHealthChange = (value) => {
    const newBatteryHealth = batteryHealth.includes(value)
      ? batteryHealth.filter((item) => item !== value)
      : [...batteryHealth, value];

    dispatch(saveFilters({ priceRange, batteryHealth: newBatteryHealth, storage, age, type }));
  };

  const handleStorageChange = (value) => {
    const newStorage = storage.includes(value)
      ? storage.filter((item) => item !== value)
      : [...storage, value];

    dispatch(saveFilters({ priceRange, batteryHealth, storage: newStorage, age, type }));
  };

  const handleAgeChange = (value) => {
    const newAge = age.includes(value)
      ? age.filter((item) => item !== value)
      : [...age, value];

    dispatch(saveFilters({ priceRange, batteryHealth, storage, age: newAge, type }));
  };

  const handleTypeChange = (value) => {
    const newType = type.includes(value)
      ? type.filter((item) => item !== value)
      : [...type, value];

    dispatch(saveFilters({ priceRange, batteryHealth, storage, age, type: newType }));
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
                  value={priceRange} // Use value instead of defaultValue
                  min={10}
                  max={500000}
                  step={100}
                  onChange={(val) => handlePriceRangeChange(val)}
                >
                  <RangeSliderTrack bg="gray.200">
                    <RangeSliderFilledTrack bg="blue.500" />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0} />
                  <RangeSliderThumb boxSize={6} index={1} />
                </RangeSlider>
              </Box>

              {/* Battery Health Filter */}
              {location.pathname === "/categories/iPhone" && (
                <Box width="100%">
                  <Text fontSize="20px" fontWeight="600" my={2}>
                    Battery Health
                  </Text>
                  <Stack direction="column" spacing={3}>
                    {["80-below", "81-90", "90-95", "95-100"].map((health) => (
                      <Checkbox
                        key={health}
                        isChecked={batteryHealth.includes(health)}
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

              {/* Storage Options Filter */}
              {location.pathname !== "/categories/Accessories" && (
                <Box width="100%">
                  <Text fontSize="20px" fontWeight="600" my={2}>
                    Storage Options
                  </Text>
                  <Stack direction="column" spacing={3}>
                    {["64GB", "128GB", "256GB", "512GB", "1TB"].map((size) => (
                      <Checkbox
                        key={size}
                        isChecked={storage.includes(size)}
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
                  {["1-3 months", "3-6 months", "6-9 months", "9 months - 1 year", "1 year above"].map((ageValue) => (
                    <Checkbox
                      key={ageValue}
                      isChecked={age.includes(ageValue)}
                      onChange={() => handleAgeChange(ageValue)}
                    >
                      {ageValue}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>

              {/* Type Filter */}
              {location.pathname === "/categories/Accessories" && (
                <Box width="100%">
                  <Text fontSize="20px" fontWeight="600" my={2}>
                    Type
                  </Text>
                  <Stack direction="column" spacing={3}>
                    {["charger", "case", "earbuds", "screen protector", "other"].map((typeValue) => (
                      <Checkbox
                        key={typeValue}
                        isChecked={type.includes(typeValue)}
                        onChange={() => handleTypeChange(typeValue)}
                      >
                        {typeValue.charAt(0).toUpperCase() + typeValue.slice(1)}
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
