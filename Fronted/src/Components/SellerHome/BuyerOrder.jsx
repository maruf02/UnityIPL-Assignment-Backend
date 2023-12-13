import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

const BuyerOrder = () => {
  const [buyerOrder, setBuyerOrder] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = user?.email;
        console.log(email);
        const response = await axiosSecure.get(`/sorder/${email}`);
        // console.log(response);

        setBuyerOrder(response.data);
      } catch (error) {
        console.error("Error fetching user catalog:", error);
      }
    };

    fetchData();
  }, [axiosSecure, user?.email]);
  return (
    <div>
      {buyerOrder.map((item) => (
        <div
          key={item._id}
          className="w-fit h-20 border rounded-lg p-5 flex gap-10 text-white bg-slate-700 text-lg m-5"
        >
          {/* <p >{item.email}</p> */}
          <p>Item Name:{item.iName}</p>
          <p>Price:{item.price}</p>
          <p>Buyer:{item.buyerEmail}</p>
          <p>Catalog:{item.cName}</p>
        </div>
      ))}
    </div>
  );
};

export default BuyerOrder;
