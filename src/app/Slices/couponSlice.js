import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setcouponData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setcouponLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setcouponError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setcouponData, setcouponLoading, setcouponError } =
  couponSlice.actions;

export const fetchcouponData = () => async (dispatch) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + "coupon/user/getAllCoupons"
    );
    dispatch(setcouponData(response.data.data));
  } catch (error) {
    dispatch(setcouponError(error.message));
  }
};


export const selectcouponData = (state) => state.coupon.data;
export const selectcouponLoading = (state) => state.coupon.isLoading;
export const selectcouponError = (state) => state.coupon.error;

export default couponSlice.reducer;
