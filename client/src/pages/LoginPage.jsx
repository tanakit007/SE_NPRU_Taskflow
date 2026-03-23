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
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Login to TaskFlow</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="input input-bordered flex items-center gap-2">
                <Mail size={18} />
                <input
                  type="email"
                  className="grow"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input input-bordered flex items-center gap-2">
                <Lock size={18} />
                <input
                  type="password"
                  className="grow"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <button className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </form>
          <p className="text-center mt-4">
            New here?{" "}
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
