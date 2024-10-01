import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [], // This can be adjusted based on your needs
    isLoading: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.data.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    setUserLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setUserError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setUserData, setUserLoading, setUserError } = userSlice.actions;

// New action for user signup
export const addUser = (userData) => async (dispatch) => {
  dispatch(setUserLoading()); // Start loading state
  try {
    // First request to create the user
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "user/addUser",
      userData
    );

    // Dispatch the success action with user data
    dispatch(setUserData(response.data.data));

    // Second request to create the user by userId
    const userId = response.data.data._id;
    await axios.post(
      import.meta.env.VITE_BASE_URL + `userData/create/${userId}`
    );

    // Create Cart

    await axios.post(
      import.meta.env.VITE_BASE_URL + `cart/createCart`,
      {userId}
    );

    // You can handle the response of this request if needed
    return response.data;
  } catch (error) {
    // Dispatch an error action
    dispatch(setUserError(error.message));
  }
};

export const selectUserData = (state) => state.user.data;
export const selectUserLoading = (state) => state.user.isLoading;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;
