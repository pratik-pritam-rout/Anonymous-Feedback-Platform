export default function FeedbackTable({ feedback }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr className="text-left text-slate-600 font-medium">
            <th className="py-4 px-4">Category</th>
            <th className="py-4 px-4">Details</th>
            <th className="py-4 px-4">Rating</th>
            <th className="py-4 px-4">Feedback</th>
            <th className="py-4 px-4">Date</th>
          </tr>
        </thead>

        <tbody>
          {feedback.map((f) => (
            <tr
              key={f._id}
              className="border-b last:border-none hover:bg-slate-50"
            >
              {/* CATEGORY */}
              <td className="py-4 px-4">
                <span className="px-3 py-1 rounded-full text-xs bg-indigo-100 text-indigo-600">
                  {f.category}
                </span>
              </td>

              {/* DETAILS (FACULTY NAME) */}
              <td className="py-4 px-4">
                {f.category === "Faculty" && f.facultyId ? (
                  <div>
                    <p className="font-medium">
                      {f.facultyId.facultyName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {f.facultyId.branch} – Section {f.facultyId.section}
                    </p>
                  </div>
                ) : (
                  <span className="text-slate-400">—</span>
                )}
              </td>

              {/* RATING */}
              <td className="py-4 px-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className={
                        s <= f.rating
                          ? "text-yellow-400"
                          : "text-slate-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </td>

              {/* FEEDBACK */}
              <td className="py-4 px-4 truncate max-w-md">
                {f.message}
              </td>

              {/* DATE */}
              <td className="py-4 px-4 text-slate-500">
                {new Date(f.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
