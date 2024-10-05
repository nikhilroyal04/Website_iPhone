import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../Slices/categorySlice";
import authReducer from "../Slices/authSlice";
import couponReducer from "../Slices/couponSlice";
import sortReducer from "../Slices/sortSlice";
import userReducer from "../Slices/userSlice";
import cartReducer from "../Slices/cartSlice";
import userDataReducer from "../Slices/userDataSlice";
import ProductReducer from "../Slices/productSlice";

const Store = configureStore({
  reducer: {
    category: categoryReducer,
    auth: authReducer,
    coupon: couponReducer,
    sort: sortReducer,
    user: userReducer,
    cart: cartReducer,
    userData: userDataReducer,
    Product: ProductReducer,
  },
});

export default Store;
