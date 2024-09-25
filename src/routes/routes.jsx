import React from "react";
import { Routes, Route } from "react-router-dom";
import FullLayout from "../layouts/FullLayouts";
import Dashboard from "../components/Dashboard/Dashboard";
// import Login from "../components/Authentication/Login";
// import Not_Found from "../components/Not_Found/Not_Found";
import PrivacyPolicy from "../components/Docx/PrivacyPolicy";
import Refund from "../components/Docx/Refund";
import TandD from "../components/Docx/TandD";
import Account from "../components/Account/Account";
import Categories from "../components/Products/Categories/Categories";
import Product from "../components/Products/Product";
import Cart from "../components/Cart/Cart";

const Routing = () => {
  return (
    // <AnimatePresence mode="wait">
    <Routes>
      {/* Authentication Routes */}
      {/* <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<SignUp />} /> */}

      {/* Main Layout Routes */}
      <Route path="/" element={<FullLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/product" element={<Dashboard />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/terms_and_condition" element={<TandD />} />
        <Route path="/bag" element={<Cart />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:title" element={<Product />} />
        <Route path="/account" element={<Account />} />
      </Route>
      {/* <Route path="*" element={<Not_Found />} /> */}
    </Routes>
    // </AnimatePresence>
  );
};

export default Routing;
