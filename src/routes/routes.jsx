import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import FullLayout from "../layouts/FullLayouts";
import Dashboard from "../components/Dashboard/Dashboard";
// import Login from "../components/Auth/Login";
// import SignUp from "../components/Auth/SignUp";
import Logout from "../components/Auth/Logout";
import Not_Found from "../components/NotFound/NotFound";
import PrivacyPolicy from "../components/Docx/PrivacyPolicy";
import Refund from "../components/Docx/Refund";
import TandD from "../components/Docx/TandD";
import Account from "../components/Account/Account";
import Categories from "../components/Products/Categories/Categories";
import IPhones from "../components/Products/iPhones/iPhones";
import Androids from "../components/Products/androids/Androids";
import Accessories from "../components/Products/accessories/Accessories";
import Cart from "../components/Cart/Cart";
import NetworkError from "../components/NotFound/NetworkError";
import ADView from "../components/Products/androids/adView";
import IView from "../components/Products/iPhones/iView";
import AcView from "../components/Products/accessories/acView";
import NotFound from "../components/NotFound/NotFound";

const Routing = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // If offline, return only the NetworkError component
  if (!isOnline) {
    return <NetworkError />;
  }

  // Render normal routing if online
  return (
    <Routes>
      {/* Authentication Routes */}
      {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
      <Route path="/logout" element={<Logout />} />

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
        <Route path="/categories/Android/:id" element={<ADView />} />
        <Route path="/categories/iPhone/:id" element={<IView />} />
        <Route path="/categories/Accessories/:id" element={<AcView />} />
        <Route path="/account" element={<Account />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Not_Found />} />
    </Routes>
  );
};

// Dynamic Category Handler based on URL
const CategoryHandler = () => {
  const { name } = useParams();

  const categoryComponents = {
    iphone: <IPhones />,
    android: <Androids />,
    accessories: <Accessories />,
  };

  return categoryComponents[name.toLowerCase()] || <NotFound />;
};

export default Routing;
