import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Slices/categorySlice";
import authReducer from "../Slices/authSlice";
import couponReducer from "../Slices/couponSlice";
import sortReducer from "../Slices/sortSlice";
import userReducer from "../Slices/userSlice";
import cartReducer from "../Slices/cartSlice";
import ProductReducer from "../Slices/productSlice";
import filtersReducer from "../Slices/filterSlice";
import featureReducer from "../Slices/featureSlice";
import orderReducer from "../Slices/orderSlice";
import addressReducer from "../Slices/addressSlice";

const Store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    coupon: couponReducer,
    sort: sortReducer,
    user: userReducer,
    cart: cartReducer,
    Product: ProductReducer,
    filters: filtersReducer,
    feature: featureReducer,
    order: orderReducer,
    address: addressReducer,
  },
});

export default Store;
