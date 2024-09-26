import React from "react";
import { useParams } from "react-router-dom";
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
import IPhones from "../components/Products/iPhones/iPhones";
import Androids from "../components/Products/androids/Androids";
import Accessories from "../components/Products/accessories/Accessories";
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
        <Route path="/categories/:name" element={<CategoryHandler />} />
        <Route path="/account" element={<Account />} />
      </Route>
      {/* <Route path="*" element={<Not_Found />} /> */}
    </Routes>
    // </AnimatePresence>
  );
};


const CategoryHandler = () => {
  const { name } = useParams();

  switch (name.toLowerCase()) {
    case "iphone":
      return <IPhones />;
    case "android":
      return <Androids />;
    case "accessories":
      return <Accessories />;
    default:
      return <div>Category not found</div>; // Fallback for unknown categories
  }
};

export default Routing;
