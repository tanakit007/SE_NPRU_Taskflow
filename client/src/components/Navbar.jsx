import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, CheckSquare, User, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 fixed top-0 z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-all"
        >
          <div className="bg-primary p-1.5 rounded-lg">
            <CheckSquare className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            TaskFlow <span className="text-primary text-sm">Mini</span>
          </span>
        </Link>
      </div>

      <div className="flex-none gap-2">
        {authUser ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${authUser.fullName}&background=random`}
                  alt="profile"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200"
            >
              <li className="menu-title px-4 py-2 opacity-60">
                Account: {authUser.fullName}
              </li>
              <li>
                <Link to="/profile">
                  <User size={16} /> Profile
                </Link>
              </li>
              <li>
                <Link to="/settings">
                  <Settings size={16} /> Settings
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button onClick={logout} className="text-error">
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
