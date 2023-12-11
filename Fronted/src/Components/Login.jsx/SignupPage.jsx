import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <label className="label">
              <span className="label-text ">SignUp AS:</span>
            </label>
            <select
              required
              name="Role"
              value={selectedType}
              onChange={handleTypeChange}
              className="select select-bordered w-full text-white bg-slate-700 "
            >
              <option value="" disabled className="text-green-600">
                Select Type
              </option>
              <option className="text-lg py-10">Buyer</option>
              <option className="text-lg py-10">Seller</option>
            </select>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign UP</button>
            </div>
            <label className="pt-2">
              <p className="text-xl text-white">
                Alreay Signup? Please:-
                <Link to="/" className="text-blue-600">
                  Login
                </Link>
              </p>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
