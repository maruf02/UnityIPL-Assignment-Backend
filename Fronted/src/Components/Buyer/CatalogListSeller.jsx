import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const CatalogListSeller = () => {
  const catalog = useLoaderData();
  const { email, name } = catalog;
  console.log(catalog[0].email);
  //   console.log(email);
  return (
    <div className="container mx-auto py-12 text-xl">
      <h2>email:{catalog[0].email}</h2>
      <h2>Catalog:{catalog[0].name}</h2>
      <Link to={`/dashboard/items/${catalog[0].email}`}>
        <button className="btn my-5 btn-accent">See All Product</button>
      </Link>
    </div>
  );
};

export default CatalogListSeller;
