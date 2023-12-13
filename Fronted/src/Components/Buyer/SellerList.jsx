import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const SellerList = () => {
  const sellerList = useLoaderData();
  const { email } = sellerList;
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full min-w-md  shadow-2xl bg-base-100">
          <h2 className="text-center">
            All Seller List <br />
          </h2>
          <div className="overflow-x-auto w-full">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Seller Email</th>
                </tr>
              </thead>
              <tbody>
                {sellerList.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <Link to={`/dashboard/catalog/${item.email}`}>
                      <td>{item.email}</td>
                      <td>
                        <p className="btn btn-accent">See details</p>
                      </td>
                    </Link>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerList;
