import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    selectedFeature: null,
  },
  reducers: {
    setFeatureData: (state, action) => {
      state.data = action.payload.features;
      state.isLoading = false;
      state.error = null;
    },
    setFeatureLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setFeatureError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedFeature: (state, action) => {
      state.selectedFeature = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setFeatureData,
  setFeatureLoading,
  setFeatureError,
  setSelectedFeature,
} = featureSlice.actions;

// Fetch all categories
export const fetchFeatureData = () => async (dispatch) => {
  dispatch(setFeatureLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "feature/getAllFeatures"
    );
    dispatch(setFeatureData(response.data.data));
  } catch (error) {
    dispatch(setFeatureError(error.message));
  }
};

// Fetch feature by ID
export const fetchFeatureById = (featureId) => async (dispatch) => {
  dispatch(setFeatureLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `feature/getFeature/${featureId}`
    );
    dispatch(setSelectedFeature(response.data.data));
  } catch (error) {
    dispatch(setFeatureError(error.message));
  }
};

// Selectors
export const selectFeatureData = (state) => state.feature.data;
export const selectFeatureLoading = (state) => state.feature.isLoading;
export const selectFeatureError = (state) => state.feature.error;
export const selectSelectedFeature = (state) => state.feature.selectedFeature;

export default featureSlice.reducer;
