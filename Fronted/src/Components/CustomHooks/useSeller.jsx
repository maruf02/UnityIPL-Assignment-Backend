import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../Authprovider/Authprovider";
import { useQuery } from "@tanstack/react-query";

const useSeller = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isSeller, isPending: isSellerLoading } = useQuery({
    queryKey: [user?.email, "isSeller"],
    enabled: !loading,
    queryFn: async () => {
      //   console.log("asking or checking is seller", user);
      const res = await axiosSecure.get(`/users/seller/${user.email}`);
      //   console.log(res.data);
      return res.data?.seller;
    },
  });
  return [isSeller, isSellerLoading];
};

export default useSeller;
