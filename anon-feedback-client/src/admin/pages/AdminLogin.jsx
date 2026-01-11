import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        {/* 🔙 Back to Home */}
        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-black
                     inline-flex items-center gap-1 mb-4"
        >
          ← Back to Home
        </Link>

        <h2 className="text-2xl font-semibold mb-6">
          Admin Login
        </h2>

        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 border px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded mt-4
                     cursor-pointer hover:bg-gray-900 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/admin/signup"
            className="text-black font-medium hover:underline"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}
