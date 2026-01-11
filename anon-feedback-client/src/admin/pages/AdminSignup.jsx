import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";

export default function AdminSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    collegeName: "",
    collegeId: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    try {
      const res = await api.post("/admin/signup", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
          Create Admin
        </h2>

        {["collegeName", "collegeId", "email", "password"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field}
            className="w-full mb-3 border px-3 py-2 rounded"
            onChange={handleChange}
          />
        ))}

        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-black text-white py-2 rounded mt-4
                     cursor-pointer hover:bg-gray-900 transition"
        >
          Create Account
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/admin/login"
            className="text-black font-medium hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
