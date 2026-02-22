import { useEffect, useState } from "react";
import { Users, BookOpen, ClipboardList, FileCheck } from "lucide-react";
import { API } from "../api";
import TeacherCard from "../Components/TeacherCard";
import ActivityChart from "../Components/ActivityChart";
import MainLayout from "../layouts/MainLayout";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    API.get("/api/teachers/summary").then((res) => {
      setSummaryData(res.data);
    });

    API.get("/api/teachers/weekly").then((res) => {
      setWeeklyData(res.data);
    });
  }, []);

  const sum = (arr, key) =>
    arr.reduce((acc, item) => acc + Number(item[key] || 0), 0);

  return (
    <MainLayout>
      {/* Page Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Admin Companion
      </h2>

      {/* Gradient Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SoftCard
          title="Teachers"
          value={summaryData.length}
          gradient="from-blue-500 to-indigo-600"
          Icon={Users}
        />

        <SoftCard
          title="Lessons"
          value={sum(summaryData, "lessons")}
          gradient="from-emerald-500 to-teal-600"
          Icon={BookOpen}
        />

        <SoftCard
          title="Quizzes"
          value={sum(summaryData, "quizzes")}
          gradient="from-pink-500 to-rose-600"
          Icon={ClipboardList}
        />

        <SoftCard
          title="Assessments"
          value={sum(summaryData, "assessments")}
          gradient="from-orange-400 to-orange-600"
          Icon={FileCheck}
        />
      </div>

      {/* Weekly Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Weekly Activity
        </h3>

        {weeklyData.length > 0 ? (
          <ActivityChart data={weeklyData} />
        ) : (
          <div className="h-72 flex items-center justify-center text-gray-400">
            No activity data available
          </div>
        )}
      </div>

      {/* Teacher Cards */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Teachers Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {summaryData.map((teacher) => (
            <TeacherCard key={teacher.teacher_id} teacher={teacher} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

/* ===================== */
/* Soft Gradient Card */
/* ===================== */

const SoftCard = ({ title, value, gradient, Icon }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white
      bg-gradient-to-r ${gradient}
      shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
    >
      <div className="flex items-center justify-between">

        {/* Left Icon */}
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
          {Icon && <Icon size={26} className="text-white opacity-90" />}
        </div>

        {/* Right Content */}
        <div className="text-right">
          <p className="text-sm opacity-90 tracking-wide">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>

      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Dashboard;