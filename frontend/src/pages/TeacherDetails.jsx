import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api";
import { Activity, CalendarCheck, TrendingUp } from "lucide-react";
import ActivityChart from "../Components/ActivityChart";
import ClassBreakdownChart from "../Components/ClassBreakdownChart";
import MainLayout from "../layouts/MainLayout";

const TeacherDetails = () => {
  const { id } = useParams();

  const [range, setRange] = useState("week");
  const [activityData, setActivityData] = useState([]);
  const [breakdownData, setBreakdownData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, [id, range]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const activityRes = await API.get(`/api/teachers/${id}?range=${range}`);
      const breakdownRes = await API.get(`/api/teachers/${id}/breakdown`);

      setActivityData(activityRes.data);
      setBreakdownData(breakdownRes.data);
    } catch (err) {
      console.error("Error fetching teacher data:", err);
    }
    setLoading(false);
  };

  const total = activityData.reduce((acc, d) => acc + Number(d.total), 0);
  const avg =
    activityData.length > 0 ? (total / activityData.length).toFixed(1) : 0;

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h2 className="text-3xl font-semibold text-red-400">
            Teacher Performance Overview
          </h2>
          <p className="text-gray-400 mt-1">
            Detailed analytics for Teacher ID: {id}
          </p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <FilterButton
            label="This Week"
            value="week"
            range={range}
            setRange={setRange}
          />
          <FilterButton
            label="This Month"
            value="month"
            range={range}
            setRange={setRange}
          />
          <FilterButton
            label="This Year"
            value="year"
            range={range}
            setRange={setRange}
          />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <DarkStatCard title="Total Activities" value={total} Icon={Activity} />
        <DarkStatCard
          title="Active Days"
          value={activityData.length}
          Icon={CalendarCheck}
        />
        <DarkStatCard title="Average per Day" value={avg} Icon={TrendingUp} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-[#14141a] rounded-2xl border border-red-900/20 p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-red-400 mb-6">
            Activity Trend
          </h3>

          {loading ? (
            <LoadingBox />
          ) : activityData.length > 0 ? (
            <ActivityChart data={activityData} />
          ) : (
            <EmptyBox message="No activity data available" />
          )}
        </div>

        <div className="bg-[#14141a] rounded-2xl border border-red-900/20 p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-red-400 mb-6">
            Class-wise Breakdown
          </h3>

          {loading ? (
            <LoadingBox />
          ) : breakdownData.length > 0 ? (
            <ClassBreakdownChart data={breakdownData} />
          ) : (
            <EmptyBox message="No class breakdown data available" />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

/* ===================== */
/* Dark Stat Card */
/* ===================== */

const DarkStatCard = ({ title, value, Icon }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6
      bg-[#1a1a22] border border-red-900/20
      shadow-lg hover:shadow-red-900/30
      transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center justify-between">
        <div className="bg-red-900/30 p-3 rounded-xl">
          {Icon && <Icon size={26} className="text-red-400" />}
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-400 tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>

      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl"></div>
    </div>
  );
};

/* ===================== */
/* Filter Button */
/* ===================== */

const FilterButton = ({ label, value, range, setRange }) => (
  <button
    onClick={() => setRange(value)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
      range === value
        ? "bg-red-600 text-white shadow-lg"
        : "bg-[#1a1a22] text-gray-400 border border-red-900/20 hover:bg-red-900/20 hover:text-red-300"
    }`}
  >
    {label}
  </button>
);

/* ===================== */

const LoadingBox = () => (
  <div className="h-72 flex items-center justify-center text-gray-500">
    Loading...
  </div>
);

const EmptyBox = ({ message }) => (
  <div className="h-72 flex items-center justify-center text-gray-500">
    {message}
  </div>
);

export default TeacherDetails;
