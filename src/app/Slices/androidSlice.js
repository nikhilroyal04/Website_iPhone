import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const androidSlice = createSlice({
  name: "android",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    AndroidById: null,
  },
  reducers: {
    setAndroidData: (state, action) => {
      state.data = action.payload.androids;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.isLoading = false;
      state.error = null;
    },
    setAndroidLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setAndroidError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setAndroidById: (state, action) => {
      state.AndroidById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

// Export actions
export const {
  setAndroidData,
  setAndroidLoading,
  setAndroidError,
  setAndroidById,
} = androidSlice.actions;

// Asynchronous thunk to fetch Android data
export const fetchAndroidData =
  (page = 1, searchTerm = "") =>
  async (dispatch) => {
    dispatch(setAndroidLoading());
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "product/Android/user/getAllAndroids",
        {
          params: {
            page,
            limit: 20,
            model: searchTerm,
          },
        }
      );

      const { androids, totalPages } = response.data.data;
      dispatch(
        setAndroidData({
          androids,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setAndroidError(error.message));
    }
  };

// Asynchronous thunk to fetch Android data by ID

export const fetchAndroidById = (id) => async (dispatch) => {
  dispatch(setAndroidLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `product/Android/getAndroid/${id}`
    );
    dispatch(setAndroidById(response.data.data));
  } catch (error) {
    dispatch(setAndroidError(error.message));
  }
};

// Selectors to access the Android state
export const selectAndroidData = (state) => state.android.data;
export const selectAndroidById = (state) => state.android.AndroidById;
export const selectAndroidLoading = (state) => state.android.isLoading;
export const selectAndroidError = (state) => state.android.error;
export const selectTotalPages = (state) => state.android.totalPages;

// Export the reducer to be used in the store
export default androidSlice.reducer;
