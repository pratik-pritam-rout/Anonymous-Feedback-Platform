import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Anonymous Feedback
          </h1>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/admin/signup"
              className="px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold
                         hover:bg-gray-900 transition shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Honest Feedback <br className="hidden sm:block" />
            <span className="text-gray-500">Better Institutions</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            A secure, anonymous platform for colleges to collect
            category-wise student feedback and turn insights into action.
          </p>

          <div className="flex justify-center gap-5">
            <Link
              to="/admin/signup"
              className="px-8 py-4 bg-black text-white rounded-full font-semibold
                         hover:bg-gray-900 transition shadow-md"
            >
              Create Admin Account
            </Link>

            <Link
              to="/admin/login"
              className="px-8 py-4 border border-gray-300 rounded-full font-semibold
                         hover:bg-gray-100 transition"
            >
              Admin Login
            </Link>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-20 border-t">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-semibold text-center mb-14">
              How It Works
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <Step
                icon={<BuildingIcon />}
                title="College Registration"
                text="Admin creates an account and sets up the college profile."
              />
              <Step
                icon={<LinkIcon />}
                title="Share Feedback Link"
                text="A unique college link is shared with students."
              />
              <Step
                icon={<ChartIcon />}
                title="View Insights"
                text="Admins review anonymous feedback in the dashboard."
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-semibold text-center mb-12">
              Key Features
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Feature text="100% anonymous feedback" />
              <Feature text="Faculty & category-wise insights" />
              <Feature text="Secure admin authentication" />
              <Feature text="Multi-college support" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black text-white py-20 text-center">
          <h3 className="text-3xl font-semibold mb-4">
            Ready to improve your institution?
          </h3>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Start collecting honest student feedback today and
            make data-driven improvements.
          </p>

          <Link
            to="/admin/signup"
            className="inline-block px-10 py-4 bg-white text-black rounded-full
                       font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Create Admin Account
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Anonymous Feedback Platform · All rights reserved
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function Step({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
      <div className="flex justify-center mb-4 text-gray-900">
        {icon}
      </div>
      <h4 className="font-semibold text-lg mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center">
      <p className="font-medium text-gray-800">{text}</p>
    </div>
  );
}

/* ---------- Icons (SVG) ---------- */

function BuildingIcon() {
  return (
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M4 21V7l8-4 8 4v14M9 21v-4h6v4" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14a3 3 0 004.2 0l3.6-3.6a3 3 0 00-4.2-4.2L12 7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 10a3 3 0 00-4.2 0L6.2 13.6a3 3 0 004.2 4.2L12 17" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V9M13 17V5M17 17v-7" />
    </svg>
  );
}
