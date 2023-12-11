import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Authprovider/Authprovider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = () => {
    logOut().then().catch();
  };
  return (
    <div className="navbar bg-green-700 rounded-2xl flex justify-between">
      <Link to="/dashboard">
        <div className="navbar-center  ">
          <a className="btn btn-ghost text-xl font-semibold">
            UnityIPL Assignment Frontend
          </a>
        </div>
      </Link>
      <div className="navbar-end">
        {/*  */}
        {user ? (
          <>
            <div className="dropdown dropdown-end flex  md:flex-row gap-3">
              <div className="hidden md:block pt-0 md:pt-2">{user.email}</div>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-12 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li></li>
                <li className="md:hidden pl-3">{user.email}</li>
                <li></li>
                <Link>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </Link>
                <li></li>
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}
        {/*  */}
      </div>
    </div>
  );
};

export default Navbar;
