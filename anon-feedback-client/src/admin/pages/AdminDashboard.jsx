import { useEffect, useState } from "react";
import api from "../../utils/api";
import FeedbackTable from "./FeedbackTable";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";

/* ---------------- HELPERS ---------------- */
const getAdminInfoFromToken = () => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return {
      collegeId: null,
      email: "admin@college.com",
    };
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      collegeId: payload.collegeId,
      email: payload.email || "admin@college.com",
    };
  } catch {
    return {
      collegeId: null,
      email: "admin@college.com",
    };
  }
};

export default function AdminDashboard() {
  const [feedback, setFeedback] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [uploadMsg, setUploadMsg] = useState("");

  const navigate = useNavigate();
  const { collegeId, email } = getAdminInfoFromToken();

  const collegeDisplayName = collegeId
    ? collegeId.toUpperCase()
    : "COLLEGE";

  const studentLink = `${window.location.origin}/feedback/${collegeId}`;

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  /* ---------------- FETCH FEEDBACK ---------------- */
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await api.get("/admin/feedback", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        setFeedback(res.data);
      } catch {
        console.error("Failed to fetch feedback");
      }
    };

    fetchFeedback();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredFeedback =
    selectedCategory === "All"
      ? feedback
      : feedback.filter((f) => f.category === selectedCategory);

  /* ---------------- STATS ---------------- */
  const avgRating =
    filteredFeedback.reduce((sum, f) => sum + f.rating, 0) /
      filteredFeedback.length || 0;

  /* ---------------- COPY LINK ---------------- */
  const copyLink = () => {
    navigator.clipboard.writeText(studentLink);
    alert("Student feedback link copied!");
  };

  /* ---------------- CSV UPLOAD ---------------- */
  const uploadFacultyCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/faculty/upload", formData);
      setUploadMsg(
        `Faculty CSV uploaded successfully ✅ (${res.data.inserted} records)`
      );
    } catch {
      setUploadMsg("CSV upload failed ❌");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 flex items-center gap-3">
            <div className="w-9 h-9 bg-black text-white rounded-lg flex items-center justify-center font-bold">
              A
            </div>
            <span className="font-semibold text-lg">
              AnonFeed Admin
            </span>
          </div>

          <nav className="px-4">
            <div className="px-4 py-2 rounded-lg bg-slate-100 font-medium">
              Dashboard
            </div>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="bg-slate-100 rounded-xl p-4">
            <p className="font-medium">{collegeDisplayName}</p>
            {/* <p className="text-sm text-slate-500">{email}</p> */}
            <button
              onClick={handleLogout}
              className="mt-3 text-sm text-red-600 hover:underline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-slate-500 mt-1">
            Anonymous feedback overview for {collegeDisplayName}
          </p>
        </div>

        {/* Student Link */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex justify-between items-center mb-10">
          <div>
            <p className="font-medium">Student Feedback Link</p>
            <p className="text-sm text-slate-500">
              Share this link with students
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              readOnly
              value={studentLink}
              className="border rounded-lg px-4 py-2 text-sm w-96 bg-slate-50"
            />
            <button
              onClick={copyLink}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Copy
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Feedback" value={filteredFeedback.length} />
          <StatCard title="Average Rating" value={avgRating.toFixed(1)} />
          <StatCard
            title="Faculty Reviews"
            value={filteredFeedback.filter(f => f.category === "Faculty").length}
          />
        </div>

        {/* Feedback Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <h3 className="text-lg font-semibold">Recent Feedback</h3>

            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm"
              >
                <option value="All">All Categories</option>
                <option value="Faculty">Faculty</option>
                <option value="Management">Management</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="General">General</option>
              </select>

              <label className="cursor-pointer border rounded-lg px-4 py-2 text-sm bg-slate-50 hover:bg-slate-100">
                Upload Faculty CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={uploadFacultyCSV}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {uploadMsg && (
            <p className="text-sm mb-4 text-slate-600">
              {uploadMsg}
            </p>
          )}

          <FeedbackTable feedback={filteredFeedback} />
        </div>
      </main>
    </div>
  );
}
