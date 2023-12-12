import React from "react";
import { useLocation } from "react-router-dom";
import useSeller from "../CustomHooks/useSeller";

const SellerRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller();
  const location = useLocation();

  if (loading || isSellerLoading) {
    return (
      <span className="loading loading-spinner loading-lg text-secondary"></span>
    );
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate state={location.pathname} to="/"></Navigate>;
};

export default SellerRoutes;
