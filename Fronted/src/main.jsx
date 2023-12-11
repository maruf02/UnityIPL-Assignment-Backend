import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Components/Login.jsx/LoginPage.jsx";

import SignupPage from "./Components/Login.jsx/SignupPage.jsx";
import Authprovider from "./Components/Authprovider/Authprovider.jsx";
import Dashborad from "./Components/Dashborad/Dashborad.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";

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
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashborad></Dashborad>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </React.StrictMode>
);
