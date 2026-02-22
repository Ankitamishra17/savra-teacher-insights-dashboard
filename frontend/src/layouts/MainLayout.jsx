import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  CalendarDays,
  Menu,
  X,
} from "lucide-react";

  const MainLayout = ({ children }) => {
  const [subject, setSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navItem = (to, label, Icon) => {
    const active = location.pathname === to;

    return (
      <Link
        to={to}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          active
            ? "bg-red-900/40 text-red-400"
            : "text-gray-400 hover:bg-red-900/20 hover:text-red-300"
        }`}
      >
        <Icon size={18} />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0f0f14] text-white">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded-lg shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/60 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300
        text-white flex flex-col justify-between shadow-2xl`}
        style={{
          background:
            "linear-gradient(180deg, #0b0b0f 0%, #1a0a12 60%, #220a16 100%)",
        }}
      >
        <div className="p-6">
          <div className="text-3xl font-bold mb-12 tracking-wide text-red-400">
            SAVRA
          </div>

          <nav className="space-y-3">
            {navItem("/", "Dashboard", LayoutDashboard)}
            {navItem("/teachers", "Teachers", Users)}
            {navItem("/reports", "Reports", FileText)}
            {navItem("/calendar", "Calendar", CalendarDays)}
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-[#14141a] px-6 md:px-10 py-4 flex justify-between items-center border-b border-red-900/20">
          <div>
            <h1 className="text-2xl font-bold text-red-400">Dashboard</h1>
            <p className="text-sm text-gray-400">Welcome back, Admin 👋</p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hidden sm:block w-60 bg-[#1c1c22] text-white rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
            />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="appearance-none bg-[#1a1a22] text-red-400 
             border border-red-900/30
             rounded-full px-5 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-red-500
             hover:border-red-600 transition"
            >
              <option className="bg-[#14141a] text-white" value="All">
                All Subjects
              </option>
              <option className="bg-[#14141a] text-white" value="Mathematics">
                Mathematics
              </option>
              <option className="bg-[#14141a] text-white" value="Science">
                Science
              </option>
              <option className="bg-[#14141a] text-white" value="English">
                English
              </option>
              <option
                className="bg-[#14141a] text-white"
                value="Social Studies"
              >
                Social Studies
              </option>
            </select>

            <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 md:p-10 bg-[#0f0f14] min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
