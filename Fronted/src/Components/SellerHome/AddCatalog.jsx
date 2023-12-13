import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";
import useAxiosSecure from "../CustomHooks/useAxiosSecure";
import { Link, useLoaderData } from "react-router-dom";
import useSeller from "../CustomHooks/useSeller";

const AddCatalog = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [userCatalogName, setUserCatalogName] = useState("");
  const [userItem, setUserItem] = useState([]);
  const [isSeller, isSellerLoading, refetch] = useSeller();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = user?.email;
        const response = await axiosSecure.get(`/catalog/${email}`);
        const userCatalog = response.data[0]?.name;

        setUserCatalogName(userCatalog || "");
      } catch (error) {
        console.error("Error fetching user catalog:", error);
      }
    };

    fetchData();
  }, [axiosSecure, user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = user?.email;
        const response = await axiosSecure.get(`/items/${email}`);
        const userCatalog = response.data;

        setUserItem(userCatalog);
      } catch (error) {
        console.error("Error fetching user catalog:", error);
      }
    };

    fetchData();
  }, [axiosSecure, user?.email]);

  const handleAddCatalog = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = user?.email;
    const info = { name, email };

    const response = await axiosSecure.get(`/catalog/${email}`);
    const userEmail = response.data[0]?.email;
    const usercatalog = response.data[0]?.name;

    if (userEmail === email) {
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
          setUserCatalogName(name);
          refetch();
        }
      });
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const form = e.target;
    const cname = form.cname.value;
    const iname = form.iname.value;
    const price = form.price.value;
    const email = user?.email;
    const info = { cname, iname, price, email };

    // console.log(info);

    axiosSecure.post("/items", info).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to your item's`,
          showConfirmButton: false,
          timer: 2500,
        });
        setUserItem((prevUserItems) => [...prevUserItems, info]);
        refetch();
      }
    });
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/items/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              setUserItem((prevUserItems) =>
                prevUserItems.filter((item) => item._id !== _id)
              );
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="flex flex-row ">
      {/* // Add catalog section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h2 className="text-center">
              Add Catalog <br />
              (Seller can add only one catalog)
            </h2>
            <form onSubmit={handleAddCatalog} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Catalog name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Catalog name"
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
      {/* // Add catalog section */}

      {/* // Add catalog item section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h2 className="text-center">
              Add Catalog item <br />
            </h2>
            <form onSubmit={handleAddItem} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Catalog name</span>
                </label>
                <input
                  type="text"
                  name="cname"
                  defaultValue={userCatalogName}
                  readOnly
                  placeholder="Catalog name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">item name</span>
                </label>
                <input
                  type="text"
                  name="iname"
                  placeholder="item name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">item Price</span>
                </label>
                <input
                  type="text"
                  name="price"
                  placeholder="item Price"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                {userCatalogName ? (
                  <>
                    <button className="btn  btn-primary">ADD Item</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary" disabled>
                      ADD Item
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* // Add catalog item section */}
      {/* // Add catalog item section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full   shadow-2xl bg-base-100">
            <h2 className="text-center">
              View All item <br />
            </h2>
            <div className="overflow-x-auto w-full">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Catalog</th>
                    <th>ItemName</th>
                    <th>Price</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userItem.map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td>{item.email}</td>
                      <td>{item.cname}</td>
                      <td>{item.iname}</td>
                      <td>${item.price}</td>
                      <td>
                        <Link to={`/dashboard/updateItem/${item._id}`}>
                          <button className="btn">Edit</button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* // Add catalog item section */}
      {/* // update  item show section */}

      {/* // update   item show section */}
    </div>
  );
};

export default AddCatalog;
