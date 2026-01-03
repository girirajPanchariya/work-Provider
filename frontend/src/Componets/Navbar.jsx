import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./useContext/AuthContext";
import axios from "axios";
import { ImProfile } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      const res = await axios.get("https://work-provider-1.onrender.com/User/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      alert(res.data.message);
      logout();
      navigate("/");
       window.location.reload(); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-[#001F3F] text-[#FF6B6B] shadow-md">
      <div className="container h-15 mx-auto px-0 py-0 flex flex-wrap justify-between items-center">
        
        {/* Left Navigation */}
        <ul className="flex gap-x-8 text-sm font-medium">
          <Link to="/">
            <li className="hover:text-blue-200 cursor-pointer">Home</li>
          </Link>

          {user?.loginType === "worker" && (
            <Link to="/work">
              <li className="hover:text-blue-200 cursor-pointer">
                Worthy of My Work
              </li>
            </Link>
          )}

          {user?.loginType === "workProvider" && (
            <Link to="/PostWork">
              <li className="hover:text-blue-200 cursor-pointer">Work</li>
            </Link>
          )}
        </ul>

        {/* Brand */}
        <h1 className="text-1xl font-bold text-center">
          Worker & Work Provider
        </h1>

        {/* Right Navigation */}
        <ul className="flex gap-x-6 items-center text-lg font-medium">
          {!user ? (
            <>
              <Link to="/Registertion">
                <li className="hover:text-blue-200 cursor-pointer">
                  Registration
                </li>
              </Link>
              <Link to="/login">
                <li className="hover:text-blue-200 cursor-pointer">Login</li>
              </Link>
            </>
          ) : (
            <div className="relative group">
              {/* Profile Avatar */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  {/* If profile image exists, show it; else default icon */}
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-white" />
                  )}
                </div>
                <span className="hidden sm:inline">{user.name}</span>
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <ImProfile className="mr-2" /> View Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
