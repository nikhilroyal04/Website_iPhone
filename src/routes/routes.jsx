import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import FullLayout from "../layouts/FullLayouts";
import NetworkError from "../components/NotFound/NetworkError";
import NotFound from "../components/NotFound/NotFound";
import Loader from "../components/NotFound/Loader";

// Lazy load components
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
// const Login = lazy(() => import("../components/Auth/Login"));
// const SignUp = lazy(() => import("../components/Auth/SignUp"));
const Logout = lazy(() => import("../components/Auth/Logout"));
const PrivacyPolicy = lazy(() => import("../components/Docx/PrivacyPolicy"));
const Refund = lazy(() => import("../components/Docx/Refund"));
const TandD = lazy(() => import("../components/Docx/TandD"));
const Account = lazy(() => import("../components/Account/Account"));
const Categories = lazy(() => import("../components/Products/Categories/Categories"));
const IPhones = lazy(() => import("../components/Products/iPhones/iPhones"));
const Androids = lazy(() => import("../components/Products/androids/Androids"));
const Accessories = lazy(() => import("../components/Products/accessories/Accessories"));
const Cart = lazy(() => import("../components/Cart/Cart"));
const Stepper = lazy(() => import("../components/Cart/Checkout/Stepper"));
const ADView = lazy(() => import("../components/Products/androids/adView"));
const IView = lazy(() => import("../components/Products/iPhones/iView"));
const AcView = lazy(() => import("../components/Products/accessories/acView"));

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
    <Suspense fallback={<Loader/>}>
      <Routes>
        {/* Authentication Routes */}
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} */}
        <Route path="/logout" element={<Logout />} />

        {/* Main Layout Routes */}
        <Route path="/" element={<FullLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/product" element={<Dashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<Refund />} />
          <Route path="/terms_and_condition" element={<TandD />} />
          <Route path="/bag" element={<Cart />} />
          <Route path="/bag/checkout" element={<Stepper />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:name" element={<CategoryHandler />} />
          <Route path="/categories/android/:id" element={<ADView />} />
          <Route path="/categories/iPhone/:id" element={<IView />} />
          <Route path="/categories/accessories/:id" element={<AcView />} />
          <Route path="/account" element={<Account />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
