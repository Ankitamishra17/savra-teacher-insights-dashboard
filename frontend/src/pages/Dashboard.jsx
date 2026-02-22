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
      <h2 className="text-3xl font-semibold text-red-400 mb-8">
        Admin Companion
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Teachers" value={summaryData.length} Icon={Users} />
        <Card
          title="Lessons"
          value={sum(summaryData, "lessons")}
          Icon={BookOpen}
        />
        <Card
          title="Quizzes"
          value={sum(summaryData, "quizzes")}
          Icon={ClipboardList}
        />
        <Card
          title="Assessments"
          value={sum(summaryData, "assessments")}
          Icon={FileCheck}
        />
      </div>

      {/* Weekly Chart Section */}
      <div className="bg-[#14141a] rounded-2xl shadow-lg border border-red-900/20 p-8 mb-10">
        <h3 className="text-xl font-semibold text-red-400 mb-6">
          Weekly Activity
        </h3>

        {weeklyData.length > 0 ? (
          <ActivityChart data={weeklyData} />
        ) : (
          <div className="h-72 flex items-center justify-center text-gray-500">
            No activity data available
          </div>
        )}
      </div>

      {/* Teacher Cards Section */}
      <div>
        <h3 className="text-xl font-semibold text-red-400 mb-6">
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

const Card = ({ title, value, Icon }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6
      bg-[#1a1a22] border border-red-900/20
      shadow-lg hover:shadow-red-900/30
      transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div className="bg-red-900/30 p-3 rounded-xl">
          {Icon && <Icon size={26} className="text-red-400" />}
        </div>

        {/* Content */}
        <div className="text-right">
          <p className="text-sm text-gray-400 tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default Dashboard;
