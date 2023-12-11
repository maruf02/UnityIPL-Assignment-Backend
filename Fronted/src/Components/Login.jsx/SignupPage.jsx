import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../CustomHooks/useAxiosPublic";
import { AuthContext } from "../Authprovider/Authprovider";

const SignupPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState("");
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;

    const userInfo = {
      email,
      role,
    };
    console.log(userInfo);
    setSignUpError("");
    setSignUpSuccess("");

    createUser(email, password)
      .then((res) => {
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            setSignUpSuccess("User Created Successfully");
            Swal.fire("User Created Successfully");
            navigate(location?.state ? location.state : "/dashboard");
          }
        });
      })
      .catch((error) => {
        // console.error(error);
        setSignUpError(error.message);
        Swal.fire(error.code);
        // console.log("abc", error.message);
      });
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
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
                name="password"
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
              name="role"
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
                Already Signup? Please:-
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
