import { useEffect, useState } from "react";
import { API } from "../api";
import TeacherCard from "../Components/TeacherCard";
import ActivityChart from "../Components/ActivityChart";
import MainLayout from "../layouts/MainLayout";

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Fetch summary data
    API.get("/api/teachers/summary").then((res) => {
      setSummaryData(res.data);
    });

    // Fetch weekly activity data
    API.get("/api/teachers/weekly").then((res) => {
      setWeeklyData(res.data);
    });
  }, []);

  const sum = (arr, key) =>
    arr.reduce((acc, item) => acc + Number(item[key] || 0), 0);

  return (
    <MainLayout>
      {/* Page Title */}
      <h2 className="text-3xl font-semibold text-black mb-8">
        Admin Companion
      </h2>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SoftCard
          title="Teachers"
          value={summaryData.length}
          bg="bg-violet-100"
        />
        <SoftCard
          title="Lessons"
          value={sum(summaryData, "lessons")}
          bg="bg-rose-100"
        />
        <SoftCard
          title="Quizzes"
          value={sum(summaryData, "quizzes")}
          bg="bg-emerald-100"
        />
        <SoftCard
          title="Assessments"
          value={sum(summaryData, "assessments")}
          bg="bg-amber-100"
        />
      </div>

      {/* Weekly Chart Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-10">
        <h3 className="text-xl font-semibold text-black mb-6">
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

const SoftCard = ({ title, value, bg }) => (
  <div className={`${bg} p-6 rounded-2xl shadow-sm border border-white`}>
    <p className="text-sm text-gray-600 mb-2">{title}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Dashboard;
