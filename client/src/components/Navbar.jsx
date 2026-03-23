import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, CheckSquare, User, Settings } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <div className="navbar bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg px-4 md:px-8 fixed top-0 z-50 border-b border-emerald-200 dark:border-emerald-800">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-all group"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-amber-500 p-2 rounded-xl shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-200">
            <CheckSquare className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
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
              className="btn btn-ghost btn-circle avatar hover:scale-110 transition-all"
            >
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2 bg-gradient-to-br from-emerald-500 to-amber-500">
                <img
                  src={`https://ui-avatars.com/api/?name=${authUser.fullName}&background=random`}
                  alt="profile"
                  className="rounded-full opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow-2xl menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box w-52 border border-emerald-200 dark:border-emerald-800 animate-scale-in"
            >
              <li className="menu-title px-4 py-2 opacity-60 bg-gradient-to-r from-emerald-500 to-amber-500 text-white rounded-lg mb-2">
                <User size={16} className="inline mr-2" /> {authUser.fullName}
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all rounded-lg"
                >
                  <User size={16} /> Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all rounded-lg"
                >
                  <Settings size={16} /> Settings
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button
                  onClick={logout}
                  className="text-error hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all rounded-lg"
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all rounded-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-sm bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white border-none shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 rounded-lg"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
