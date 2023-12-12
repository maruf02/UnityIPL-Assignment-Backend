import React from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";

const UpdateItem = () => {
  const items = useLoaderData();
  const { _id, iname, price, cname, email } = items;
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const iname = form.iname.value;
    const price = form.price.value;
    const info = { cname, iname, price, email };
    console.log(info);

    axiosSecure.put(`/items/${_id}`, info).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} Updated`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleUpdate} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Name</span>
              </label>
              <input
                type="text"
                defaultValue={iname}
                name="iname"
                placeholder="Item Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Price</span>
              </label>
              <input
                type="text"
                name="price"
                defaultValue={price}
                placeholder="Item Price"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
