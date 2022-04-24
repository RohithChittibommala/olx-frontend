import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <div className=" py-6 px-6 flex items-center justify-between">
      <div
        className="flex font-sans font-extrabold text-4xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/olx-logo.png" className="w-12" alt="logo" />
      </div>
      <div className="flex space-x-4">
        <Link to="/profile">
          <h2 className="h-10 w-10 rounded-full  bg-orange-500 justify-center flex items-center">
            <p className="text-white uppercase">{user.name.charAt(0)}</p>
          </h2>
        </Link>

        <Link to="/create">
          <button className="py-2 duration-150 transition hover:bg-pink-300 text-white bg-pink-400 rounded-md font-bold  px-8 ">
            Sell
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
