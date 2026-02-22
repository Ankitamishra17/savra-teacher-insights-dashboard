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
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
        ${
          active
            ? "bg-white/10 text-white shadow-lg shadow-black/20"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon size={18} />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#0F2D4E] text-white p-2 rounded-lg shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300
        bg-gradient-to-b from-[#0F2D4E] to-[#123C66]
        text-white flex flex-col justify-between shadow-2xl`}
      >
        <div className="p-6">
          <div className="text-3xl font-bold mb-12 tracking-wide">SAVRA</div>

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
        {/* TOPBAR */}
        <header className="bg-white px-6 md:px-10 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin 👋</p>
          </div>

          <div className="flex items-center gap-4">
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hidden sm:block w-60 bg-gray-100 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* SUBJECT DROPDOWN */}
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-blue-600 text-white rounded-full px-5 py-2 text-sm shadow-md shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option className="text-black bg-white" value="All">
                All Subjects
              </option>
              <option className="text-black bg-white" value="Mathematics">
                Mathematics
              </option>
              <option className="text-black bg-white" value="Science">
                Science
              </option>
              <option className="text-black bg-white" value="English">
                English
              </option>
              <option className="text-black bg-white" value="Social Studies">
                Social Studies
              </option>
            </select>

            {/* PROFILE */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-center font-semibold shadow-md shadow-blue-500/30">
              A
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
