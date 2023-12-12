import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";

const AddCatalog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = user?.email;
    const info = { name, email };

    const response = await axiosSecure.get(`/catalog/${email}`);
    const userStatus = response.data[0].email;
    if (userStatus === email) {
      Swal.fire(`You can create only one catalog.Already Create a catalog.`);
    } else {
      axiosSecure.post("/catalog", info).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your Catalog`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      });
    }
  };
  return (
    //   Add catalog section
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <h2 className="text-center">
            Add Catalog <br />
            (Seller can add only one catalog)
          </h2>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Catalog name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">ADD</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    //   Add catalog section
    //   Add catalog item section
  );
};

export default AddCatalog;
