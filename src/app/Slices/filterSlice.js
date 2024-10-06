// filterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  priceRange: [10, 500000],
  batteryHealth: [],
  storage: [],
  age: [],
  type: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    saveFilters: (state, action) => {
      const { priceRange, batteryHealth, storage, age, type } = action.payload;
      state.priceRange = priceRange;
      state.batteryHealth = batteryHealth;
      state.storage = storage;
      state.age = age;
      state.type = type;
    },
    clearFilters: (state) => {
      state.priceRange = initialState.priceRange;
      state.batteryHealth = initialState.batteryHealth;
      state.storage = initialState.storage;
      state.age = initialState.age;
      state.type = initialState.type;
    },
  },
});

// Export the actions
export const { saveFilters, clearFilters } = filterSlice.actions;

// Selectors
export const selectSavedFilters = (state) => state.filters;

// Export the reducer
export default filterSlice.reducer;
