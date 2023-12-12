import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Components/Login.jsx/LoginPage.jsx";

import SignupPage from "./Components/Login.jsx/SignupPage.jsx";
import Authprovider from "./Components/Authprovider/Authprovider.jsx";
import Dashborad from "./Components/Dashborad/Dashborad.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SellerHome from "./Components/SellerHome/SellerHome.jsx";
import AddCatalog from "./Components/SellerHome/AddCatalog.jsx";
import UpdateItem from "./Components/SellerHome/UpdateItem.jsx";

const queryClient = new QueryClient();

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
    element: <Dashborad></Dashborad>,
    children: [
      {
        path: "/dashboard",
        element: <SellerHome></SellerHome>,
      },
      {
        path: "/dashboard/addCatalog",
        element: <AddCatalog></AddCatalog>,
      },
      {
        path: "/dashboard/updateItem/:id",
        element: <UpdateItem></UpdateItem>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/itemss/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Authprovider>
  </React.StrictMode>
);
