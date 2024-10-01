import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setUserDataLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUserDataError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setUserData, setUserDataLoading, setUserDataError } =
  userDataSlice.actions;

export const getUserDataItemsByUserId = (userId) => async (dispatch) => {
  dispatch(setUserDataLoading());
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `userData/userId/${userId}`
    );
    dispatch(setUserData(response.data.data));
  } catch (error) {
    dispatch(setUserDataError(error.message));
  }
};

// Action for adding a user data item
export const addUserAddress = (userId, addressData) => async (dispatch) => {
  dispatch(setUserDataLoading());
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + `userData/addresses/addAddress/${userId}`,
      addressData
    );
    dispatch(getUserDataItemsByUserId(userId));
    return response.data;
  } catch (error) {
    dispatch(setUserDataError(error.message));
  }
};

// Action for deleting a user data item
export const deleteUserAddress =
  (userId, addressToDelete) => async (dispatch) => {
    dispatch(setUserDataLoading());
    try {
      await axios.delete(
        import.meta.env.VITE_BASE_URL +
          `userData/addresses/deleteAddress/${userId}/${addressToDelete}`
      );
      dispatch(getUserDataItemsByUserId(userId));
    } catch (error) {
      dispatch(setUserDataError(error.message));
    }
  };

// Action for updating a user data item
export const updateUserAddress =
  (userId, addressId, addressData) => async (dispatch) => {
    dispatch(setUserDataLoading());
    try {
      const response = await axios.put(
        import.meta.env.VITE_BASE_URL +
          `userData/addresses/updateAddress/${userId}/${addressId}`,
        addressData
      );
      dispatch(getUserDataItemsByUserId(userId));
      return response.data;
    } catch (error) {
      dispatch(setUserDataError(error.message));
    }
  };

// Action for creating an order
export const createOrder = (userId, cartData) => async (dispatch) => {
  dispatch(setUserDataLoading());
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + `userData/orders/addOrder/${userId}`,
      cartData
    );
    dispatch(getUserDataItemsByUserId(userId));
    return response.data;
  } catch (error) {
    dispatch(setUserDataError(error.message));
  }
};

// Action for updating order status
export const updateOrderStatus =
  (userId, orderId, updatedOrderStatus) => async (dispatch) => {
    dispatch(setUserDataLoading());
    try {
      const response = await axios.put(
        import.meta.env.VITE_BASE_URL +
          `userData/orders/updateOrder/${userId}/${orderId}`,
        updatedOrderStatus
      );
      dispatch(getUserDataItemsByUserId(userId));
      return response.data;
    } catch (error) {
      dispatch(setUserDataError(error.message));
    }
  };

export const selectUserData = (state) => state.userData.data;
export const selectUserDataLoading = (state) => state.userData.isLoading;
export const selectUserDataError = (state) => state.userData.error;

export default userDataSlice.reducer;
