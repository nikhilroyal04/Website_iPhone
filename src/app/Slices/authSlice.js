import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// Initial state for the authentication slice
const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,  // Load user data from cookies
  token: Cookies.get("authToken") || null,
  tokenExpiry: Cookies.get("authTokenExpiry") || null,  // Store token expiry time in Unix
  isLoading: false,
  error: null,
};

// Create a slice for user authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token, tokenExpiry } = action.payload;
      state.user = user;  // Set user data in the state
      state.token = token;
      state.tokenExpiry = tokenExpiry;
      state.isLoading = false;
      state.error = null;
      Cookies.set("authToken", token, { expires: new Date(tokenExpiry * 1000) });
      Cookies.set("authTokenExpiry", tokenExpiry);
      Cookies.set("user", JSON.stringify(user)); // Save user data in cookies
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
      state.isLoading = false;
      state.error = null;
      Cookies.remove("authToken");
      Cookies.remove("authTokenExpiry");
      Cookies.remove("user"); // Remove user data from cookies
    },
  },
});

// Export actions
export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk for handling login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const { token, tokenExpiry } = response.data.data;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const userDetailsResponse = await axios.get(
      `${import.meta.env.VITE_BASE_URL}get/profile`,
      { headers, withCredentials: true }
    );

    const user = userDetailsResponse.data.data;

    if (user.status !== "Active") {
      throw new Error("Your account is not active.");
    }

    dispatch(loginSuccess({ user, token, tokenExpiry }));

    return response;
  } catch (error) {
    dispatch(
      loginFailure(
        error.response?.data?.errorMessage ||
        error.message ||
        "An unexpected error occurred"
      )
    );
  }
};

// Utility to check token validity
export const isTokenExpired = (state) => {
  const expiry = state.auth.tokenExpiry;
  return expiry && expiry < Math.floor(Date.now() / 1000);
};

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

// Export reducer
export default authSlice.reducer;