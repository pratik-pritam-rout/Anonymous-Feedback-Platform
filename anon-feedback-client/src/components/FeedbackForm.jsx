import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FeedbackForm() {
  const { collegeId } = useParams();

  const [category, setCategory] = useState("Faculty");
  const [branch, setBranch] = useState("");
  const [section, setSection] = useState("");
  const [facultyList, setFacultyList] = useState([]);
  const [facultyId, setFacultyId] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  /* ---------------- Fetch Faculty ---------------- */
  useEffect(() => {
    if (category !== "Faculty" || !branch || !section) {
      setFacultyList([]);
      return;
    }

    axios
      .get("http://localhost:5000/api/faculty", {
        params: { collegeId, branch, section },
      })
      .then((res) => setFacultyList(res.data))
      .catch(() => setFacultyList([]));
  }, [branch, section, category, collegeId]);

  /* ---------------- Submit ---------------- */
  const submitFeedback = async () => {
    if (!message || rating === 0) {
      setStatus("Please fill all required fields.");
      return;
    }

    if (category === "Faculty" && !facultyId) {
      setStatus("Please select a faculty.");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      await axios.post("http://localhost:5000/api/feedback", {
        collegeId,
        category,
        facultyId: category === "Faculty" ? facultyId : null,
        branch: category === "Faculty" ? branch : null,
        section: category === "Faculty" ? section : null,
        rating,
        message,
      });

      setCategory("Faculty");
      setBranch("");
      setSection("");
      setFacultyId("");
      setFacultyList([]);
      setMessage("");
      setRating(0);

      setStatus("Feedback submitted anonymously ✅");
    } catch {
      setStatus("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-slate-900">
          Anonymous Feedback
        </h1>
        <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
          This feedback is reviewed only by college administration.
          <br />
          Your identity is never collected or stored.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-[1350px] mx-auto bg-white rounded-[32px] shadow-xl border border-slate-200 p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Feedback Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-5 py-3 bg-white
                          text-slate-700 focus:ring-2 focus:ring-slate-900 focus:outline-none"
              >
                <option>Faculty</option>
                <option>Management</option>
                <option>Infrastructure</option>
                <option>General</option>
              </select>
            </div>

            {/* FACULTY SECTION */}
            <div
              className={`transition-all duration-300 ${category === "Faculty"
                ? "opacity-100"
                : "opacity-0 pointer-events-none h-0 overflow-hidden"
                }`}
            >
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-5 py-3 bg-white"
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Section
                  </label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-5 py-3 bg-white"
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Faculty Member
                </label>
                <select
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-5 py-3 bg-white"
                >
                  <option value="">Select Faculty</option>
                  {facultyList.map((f) => (
                    <option key={f._id} value={f._id}>
                      {f.facultyName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Overall Rating
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating((prev) => (prev === s ? 0 : s))}
                    className={`
                      transition-transform duration-200
                      ${s <= rating ? "scale-110" : "hover:scale-105"}
                    `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={s <= rating ? "#f59e0b" : "#cbd5e1"}
                      className="w-9 h-9"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24
                        l-7.19-.61L12 2 9.19 8.63
                        2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Written Feedback
            </label>
            <textarea
              rows={11}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please share your experience, suggestions, or concerns in a respectful and constructive manner."
              className="w-full rounded-2xl border border-slate-300 px-6 py-5 bg-white
                        resize-none focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />

            <button
              onClick={submitFeedback}
              disabled={loading}
              className="mt-8 w-full bg-slate-900 text-white py-4 rounded-xl
                        text-base font-semibold hover:bg-slate-800 transition
                        disabled:opacity-60 cursor-pointer"
            >
              Submit Feedback
            </button>

            {status && (
              <p
                className={`mt-4 text-center text-sm ${status.includes("✅")
                  ? "text-emerald-600"
                  : "text-red-600"
                  }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}
