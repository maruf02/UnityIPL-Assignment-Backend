import React from "react";
import Navbar from "./Navbar/Navbar";
import useSeller from "../CustomHooks/useSeller";
import { NavLink, Outlet } from "react-router-dom";

const Dashborad = () => {
  const [isSeller] = useSeller();
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashborad;
