import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; 

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("authToken");

    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
}
