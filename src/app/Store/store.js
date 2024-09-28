import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Slices/categorySlice";
import authReducer from "../Slices/authSlice";
import couponReducer from "../Slices/couponSlice";
import iPhoneReducer from "../Slices/iPhoneSlice";
import androidReducer from "../Slices/androidSlice";
import accessoryReducer from "../Slices/accessorySlice";
import sortReducer from "../Slices/sortSlice";
import userReducer from "../Slices/userSlice";

const Store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    coupon: couponReducer,
    iPhone: iPhoneReducer,
    android: androidReducer,
    accessory: accessoryReducer,
    sort: sortReducer,
    user: userReducer,
  },
});

export default Store;
