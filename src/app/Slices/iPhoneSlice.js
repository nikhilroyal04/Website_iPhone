import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const iPhoneSlice = createSlice({
  name: "iPhone",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    iPhoneById: null,
  },
  reducers: {
    setiPhoneData: (state, action) => {
      state.data = action.payload.iPhones;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
      state.error = null;
    },
    setiPhoneLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setiPhoneError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setiPhoneById: (state, action) => {
      state.iPhoneById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Export actions
export const {
  setiPhoneData,
  setiPhoneLoading,
  setiPhoneError,
  setiPhoneById,
} = iPhoneSlice.actions;

// Asynchronous thunk to fetch iPhone data
export const fetchiPhoneData =
  (page = 1) =>
  async (dispatch) => {
    dispatch(setiPhoneLoading());
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "product/iPhone/user/getAlliPhones",
        {
          params: {
            page,
            limit: 20,
          },
        }
      );
      const { iPhones, totalPages } = response.data.data;
      dispatch(
        setiPhoneData({
          iPhones,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setiPhoneError(error.message));
    }
  };

// Asynchronous thunk to fetch iPhone data by ID

export const fetchiPhoneById = (id) => async (dispatch) => {
  dispatch(setiPhoneLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `product/iPhone/getiPhone${id}`
    );
    dispatch(setiPhoneById(response.data.data));
  } catch (error) {
    dispatch(setiPhoneError(error.message));
  }
};

// Selectors to access the iPhone state
export const selectiPhoneData = (state) => state.iPhone.data;
export const selectiPhoneLoading = (state) => state.iPhone.isLoading;
export const selectiPhoneError = (state) => state.iPhone.error;
export const selectTotalPages = (state) => state.iPhone.totalPages;

// Export the reducer to be used in the store
export default iPhoneSlice.reducer;
