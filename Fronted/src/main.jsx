import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Components/Login.jsx/LoginPage.jsx";
import BuyerHomePage from "./Components/HomePage/BuyerHomePage.jsx";
import SellerHomePage from "./Components/HomePage/SellerHomePage.jsx";
import SignupPage from "./Components/Login.jsx/SignupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "dashboard/buyer",
    element: <BuyerHomePage></BuyerHomePage>,
  },
  {
    path: "dashboard/seller",
    element: <SellerHomePage></SellerHomePage>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
