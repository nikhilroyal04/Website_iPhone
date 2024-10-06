import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    iPhoneData: {
      data: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
    androidData: {
      data: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
    accessoriesData: {
      data: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
    allProductsData: {
      data: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
    ProductById: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setIPhoneData: (state, action) => {
      state.iPhoneData.data = action.payload.products;
      state.iPhoneData.totalPages = action.payload.totalPages;
      state.iPhoneData.currentPage = action.payload.currentPage;
      state.iPhoneData.isLoading = false;
      state.iPhoneData.error = null;
    },
    setIPhoneLoading: (state) => {
      state.iPhoneData.isLoading = true;
      state.iPhoneData.error = null;
    },
    setIPhoneError: (state, action) => {
      state.iPhoneData.isLoading = false;
      state.iPhoneData.error = action.payload;
    },
    setAndroidData: (state, action) => {
      state.androidData.data = action.payload.products;
      state.androidData.totalPages = action.payload.totalPages;
      state.androidData.currentPage = action.payload.currentPage;
      state.androidData.isLoading = false;
      state.androidData.error = null;
    },
    setAndroidLoading: (state) => {
      state.androidData.isLoading = true;
      state.androidData.error = null;
    },
    setAndroidError: (state, action) => {
      state.androidData.isLoading = false;
      state.androidData.error = action.payload;
    },
    setAccessoriesData: (state, action) => {
      state.accessoriesData.data = action.payload.products;
      state.accessoriesData.totalPages = action.payload.totalPages;
      state.accessoriesData.currentPage = action.payload.currentPage;
      state.accessoriesData.isLoading = false;
      state.accessoriesData.error = null;
    },
    setAccessoriesLoading: (state) => {
      state.accessoriesData.isLoading = true;
      state.accessoriesData.error = null;
    },
    setAccessoriesError: (state, action) => {
      state.accessoriesData.isLoading = false;
      state.accessoriesData.error = action.payload;
    },
    setProductById: (state, action) => {
      state.ProductById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setProductLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    setProductError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setAllProductsData: (state, action) => {
      state.allProductsData.data = action.payload.products;
      state.allProductsData.totalPages = action.payload.totalPages;
      state.allProductsData.currentPage = action.payload.currentPage;
      state.allProductsData.isLoading = false;
      state.allProductsData.error = null;
    },
    setAllProductsLoading: (state) => {
      state.allProductsData.isLoading = true;
      state.allProductsData.error = null;
    },
    setAllProductsError: (state, action) => {
      state.allProductsData.isLoading = false;
      state.allProductsData.error = action.payload;
    },
  },
});

// Export actions
export const {
  setIPhoneData,
  setIPhoneLoading,
  setIPhoneError,
  setAndroidData,
  setAndroidLoading,
  setAndroidError,
  setAccessoriesData,
  setAccessoriesLoading,
  setAccessoriesError,
  setProductById,
  setProductLoading,
  setProductError,
  setAllProductsData,
  setAllProductsLoading,
  setAllProductsError,
} = ProductSlice.actions;

// Asynchronous thunk to fetch all products
export const fetchAllProductsData =
  (page = 1, searchTerm = "") =>
  async (dispatch) => {
    dispatch(setAllProductsLoading());
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}product/available/getAllProducts`,
        {
          params: {
            page,
            limit: 20,
            model: searchTerm,
          },
        }
      );
      const { products, totalPages } = response.data.data;
      dispatch(
        setAllProductsData({
          products,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setAllProductsError(error.message));
    }
  };

// Asynchronous thunk to fetch iPhone accessory data
export const fetchiPhoneData =
  (
    page = 1,
    priceRange = [10, 500000],
    storageQuery,
    batteryHealthQuery,
    ageQuery
  ) =>
  async (dispatch) => {
    dispatch(setIPhoneLoading());
    const priceQuery = `${priceRange[0]}-${priceRange[1]}`;

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }product/available/getAllProducts?categoryName=iPhone`,
        {
          params: {
            page,
            limit: 20,
            price: priceQuery,
            storage: storageQuery,
            batteryHealth: batteryHealthQuery,
            age: ageQuery,
          },
        }
      );
      const { products, totalPages } = response.data.data;
      dispatch(
        setIPhoneData({
          products,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setIPhoneError(error.message));
    }
  };

// Asynchronous thunk to fetch Android accessory data
export const fetchAndroidData =
  (
    page = 1,
    priceRange = [10, 500000],
    storageQuery,
    ageQuery
  ) =>
  async (dispatch) => {
    dispatch(setAndroidLoading());
    const priceQuery = `${priceRange[0]}-${priceRange[1]}`;

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }product/available/getAllProducts?categoryName=Android`,
        {
          params: {
            page,
            limit: 20,
            price: priceQuery,
            storage: storageQuery,
            age: ageQuery,
          },
        }
      );
      const { products, totalPages } = response.data.data;
      dispatch(
        setAndroidData({
          products,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setAndroidError(error.message));
    }
  };

// Asynchronous thunk to fetch accessories data
export const fetchAccessoriesData =
  (page = 1, priceRange = [10, 500000], ageQuery, typeQuery) =>
  async (dispatch) => {
    dispatch(setAccessoriesLoading());
    const priceQuery = `${priceRange[0]}-${priceRange[1]}`;

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }product/available/getAllProducts?categoryName=Accessory`,
        {
          params: {
            page,
            limit: 20,
            price: priceQuery,
            age: ageQuery,
            type: typeQuery,
          },
        }
      );
      const { products, totalPages } = response.data.data;
      dispatch(
        setAccessoriesData({
          products,
          totalPages,
          currentPage: page,
        })
      );
    } catch (error) {
      dispatch(setAccessoriesError(error.message));
    }
  };

// Asynchronous thunk to fetch Product data by ID
export const fetchProductById = (id) => async (dispatch) => {
  dispatch(setProductLoading());
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}product/getProductById/${id}`
    );
    dispatch(setProductById(response.data.data));
  } catch (error) {
    dispatch(setProductError(error.message));
  }
};

// Selectors to access the Product state
export const selectIPhoneData = (state) => state.Product.iPhoneData.data;
export const selectIPhoneLoading = (state) =>
  state.Product.iPhoneData.isLoading;
export const selectIPhoneError = (state) => state.Product.iPhoneData.error;
export const selectIPhoneTotalPages = (state) =>
  state.Product.iPhoneData.totalPages; // Selector for total pages

export const selectAndroidData = (state) => state.Product.androidData.data;
export const selectAndroidLoading = (state) =>
  state.Product.androidData.isLoading;
export const selectAndroidError = (state) => state.Product.androidData.error;
export const selectAndroidTotalPages = (state) =>
  state.Product.androidData.totalPages; // Selector for total pages

export const selectAccessoriesData = (state) =>
  state.Product.accessoriesData.data;
export const selectAccessoriesLoading = (state) =>
  state.Product.accessoriesData.isLoading;
export const selectAccessoriesError = (state) =>
  state.Product.accessoriesData.error;
export const selectAccessoriesTotalPages = (state) =>
  state.Product.accessoriesData.totalPages; // Selector for total pages

export const selectAllProductsData = (state) =>
  state.Product.allProductsData.data;
export const selectAllProductsLoading = (state) =>
  state.Product.allProductsData.isLoading;
export const selectAllProductsError = (state) =>
  state.Product.allProductsData.error;
export const selectAllProductsTotalPages = (state) =>
  state.Product.allProductsData.totalPages; // Selector for total pages

export const selectProductById = (state) => state.Product.ProductById;

// Export the reducer to be used in the store
export default ProductSlice.reducer;
