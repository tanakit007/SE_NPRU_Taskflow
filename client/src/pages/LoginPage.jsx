import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body p-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Login
          </h2>
          <p className="text-center text-base-content/60 mb-6">
            Welcome back to TaskFlow Mini!
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <div className="input input-bordered flex items-center gap-3">
                <Mail size={18} className="text-base-content/40" />
                <input
                  type="email"
                  className="grow"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="input input-bordered flex items-center gap-3">
                <Lock size={18} className="text-base-content/40" />
                <input
                  type="password"
                  className="grow"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              className="btn btn-primary w-full text-lg mt-4"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? <Loader2 className="animate-spin" /> : "Sign In"}
            </button>
          </form>
          <p className="text-center mt-6 text-base-content/70">
            New here?{" "}
            <Link to="/signup" className="link link-primary font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
