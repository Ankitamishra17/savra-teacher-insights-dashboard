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
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
        ${
          active
            ? "bg-white/25 backdrop-blur text-white shadow"
            : "hover:bg-white/20 text-white/90"
        }`}
      >
        <Icon size={18} />
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-violet-600 text-white p-2 rounded-lg shadow-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 
        bg-gradient-to-b from-violet-500 via-purple-400 
        text-white p-6 flex flex-col justify-between shadow-2xl`}
      >
        <div>
          <div className="text-2xl font-bold mb-12 tracking-wide">SAVRA</div>

          <nav className="space-y-3">
            {navItem("/", "Dashboard", LayoutDashboard)}
            {navItem("/teachers", "Teachers", Users)}
            {navItem("/reports", "Reports", FileText)}
            {navItem("/calendar", "Calendar", CalendarDays)}
          </nav>
        </div>

       
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white/70 backdrop-blur-md shadow-sm px-6 md:px-10 py-4 flex justify-between items-center border-b border-white/40">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin 👋</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search teacher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="hidden sm:block w-56 bg-slate-100 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            />

            {/* Dropdown */}
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full px-4 py-2.5 text-sm shadow hover:opacity-90 transition"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="Social Studies">Social Studies</option>
            </select>

            {/* Profile */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white flex items-center justify-center font-semibold shadow-lg">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
