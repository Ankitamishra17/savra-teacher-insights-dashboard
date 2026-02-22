import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../api";
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

  // Calculations
  const total = activityData.reduce((acc, d) => acc + Number(d.total), 0);

  const avg =
    activityData.length > 0 ? (total / activityData.length).toFixed(1) : 0;

  return (
    <MainLayout>
      {/* Header + Filters */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Teacher Performance Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Detailed analytics for Teacher ID: {id}
          </p>
        </div>

        {/* Time Filters */}
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

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <SoftStatCard
          title="Total Activities"
          value={total}
          bg="bg-violet-100"
        />
        <SoftStatCard
          title="Active Days"
          value={activityData.length}
          bg="bg-emerald-100"
        />
        <SoftStatCard title="Average per Day" value={avg} bg="bg-amber-100" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Activity Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
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

        {/* Class Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
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

/* ========================= */
/* Components */
/* ========================= */

const FilterButton = ({ label, value, range, setRange }) => (
  <button
    onClick={() => setRange(value)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
      range === value
        ? "bg-violet-500 text-white shadow"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    {label}
  </button>
);

const SoftStatCard = ({ title, value, bg }) => (
  <div className={`${bg} p-6 rounded-2xl shadow-sm`}>
    <p className="text-gray-600 text-sm mb-2">{title}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </div>
);

const LoadingBox = () => (
  <div className="h-72 flex items-center justify-center text-gray-400">
    Loading...
  </div>
);

const EmptyBox = ({ message }) => (
  <div className="h-72 flex items-center justify-center text-gray-400">
    {message}
  </div>
);

export default TeacherDetails;
