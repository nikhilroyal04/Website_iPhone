import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const accessorySlice = createSlice({
  name: "accessory",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    AccessoryById: null,
  },
  reducers: {
    setAccessoryData: (state, action) => {
      state.data = action.payload.accessories;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
      state.error = null;
    },
    setAccessoryLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setAccessoryError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setAccessoryById: (state, action) => {
      state.AccessoryById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Export actions
export const {
  setAccessoryData,
  setAccessoryLoading,
  setAccessoryError,
  setAccessoryById,
} = accessorySlice.actions;

// Asynchronous thunk to fetch accessory data
export const fetchAccessoryData =
  (page = 1) =>
  async (dispatch) => {
    dispatch(setAccessoryLoading());
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL +
          "product/accessory/user/getAllAccessories",
        {
          params: {
            page,
            limit: 20,
          },
        }
      );
      const { accessories, totalPages } = response.data.data;
      dispatch(
        setAccessoryData({
          accessories,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setAccessoryError(error.message));
    }
  };

// Asynchronous thunk to fetch Accessory data by ID

export const fetchAccessoryById = (id) => async (dispatch) => {
  dispatch(setAccessoryLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `product/accessory/getAccessory/${id}`
    );
    dispatch(setAccessoryById(response.data.data));
  } catch (error) {
    dispatch(setAccessoryError(error.message));
  }
};

// Selectors to access the accessory state
export const selectAccessoryData = (state) => state.accessory.data;
export const selectAccessoryById = (state) => state.accessory.AccessoryById;
export const selectAccessoryLoading = (state) => state.accessory.isLoading;
export const selectAccessoryError = (state) => state.accessory.error;
export const selectTotalPages = (state) => state.accessory.totalPages;

// Export the reducer to be used in the store
export default accessorySlice.reducer;
