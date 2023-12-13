import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";

const AllItemShow = () => {
  const items = useLoaderData();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleOrder = async (id) => {
    console.log(id);
    // console.log(email);
    const response = await axiosSecure.get(
      `http://localhost:5000/itemss/${id}`
    );
    // setItemss(response.data);
    // console.log(response.data);
    const sellerId = id;
    const buyerEmail = user?.email;
    const sellerEmail = response.data.email;
    const cName = response.data.cname;
    const iName = response.data.iname;
    const price = response.data.price;
    const info = {
      sellerId,
      buyerEmail,
      cName,
      sellerEmail,
      iName,
      price,
    };
    console.log(info);
    axiosSecure.post("/order", info).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${iName} added to your Order`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item._id}
          className="w-fit h-20 border rounded-lg p-5 flex gap-10 text-white bg-slate-700 text-lg m-5"
        >
          {/* <p >{item.email}</p> */}
          <p>Item Name:{item.iname}</p>
          <p>Price:{item.price}</p>
          <p className="btn btn-accent" onClick={() => handleOrder(item._id)}>
            Order
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllItemShow;
