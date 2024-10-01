import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setcartData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setcartLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setcartError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setcartData, setcartLoading, setcartError } = cartSlice.actions;

export const getCartItemsByUserId = (userId) => async (dispatch) => {
  dispatch(setcartLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `cart/getCart/${userId}`
    );
    dispatch(setcartData(response.data.data));
  } catch (error) {
    dispatch(setcartError(error.message));
  }
};

// Action for adding a cart item
export const addCartItem = (userId, cartData) => async (dispatch) => {
  dispatch(setcartLoading());
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + `cart/addItem/${userId}`,
      cartData
    );
    dispatch(setcartData(response.data.data));
    return response.data;
  } catch (error) {
    dispatch(setcartError(error.message));
  }
};

// Action for deleting a cart item
export const deleteCartItem =
  ({ userId, productId, variantId }) =>
  async (dispatch) => {
    dispatch(setcartLoading()); // Start loading state.

    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BASE_URL
        }cart/removeItem/${userId}/${productId}/${variantId}`
      );

      // After successfully deleting, fetch the updated cart items.
      dispatch(getCartItemsByUserId(userId));
    } catch (error) {
      dispatch(setcartError(error.message));
    }
  };

export const selectcartData = (state) => state.cart.data;
export const selectcartLoading = (state) => state.cart.isLoading;
export const selectcartError = (state) => state.cart.error;

export default cartSlice.reducer;
