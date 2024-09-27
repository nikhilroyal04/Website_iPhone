import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setcategoryData: (state, action) => {
      state.data = action.payload.categories;
      state.isLoading = false;
      state.error = null;
    },
    setcategoryLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setcategoryError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setcategoryData, setcategoryLoading, setcategoryError } =
  categorySlice.actions;

export const fetchcategoryData = () => async (dispatch) => {
  dispatch(setcategoryLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "category/user/getAllCategories"
    );
    dispatch(setcategoryData(response.data.data));
  } catch (error) {
    dispatch(setcategoryError(error.message));
  }
};


export const selectcategoryData = (state) => state.category.data;
export const selectcategoryLoading = (state) => state.category.isLoading;
export const selectcategoryError = (state) => state.category.error;

export default categorySlice.reducer;
