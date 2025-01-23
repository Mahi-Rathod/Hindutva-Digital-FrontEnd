import React, { useEffect } from "react";
import TrafficChart from "../../charts/TrafficCharts.jsx";
import EngagementChart from "../../charts/EngagementChart.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../../../redux/slices/dashboardSlice.js';


const Dashboard = () => {
  const { isLight } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { dashboardData, allPosts } = useSelector((state) => state.dashboard);

  const { totalPosts, totalUsers, totalCategories, pendingPosts } = dashboardData;

  const stats = [
    { title: "Total Posts", value: totalPosts },
    { title: "Total Users", value: totalUsers },
    { title: "Total Categories", value: totalCategories },
    { title: "Pending Posts", value: pendingPosts },
  ];
  const engagementData = [
    { category: "Social Media", engagement: 40 },
    { category: "Email Marketing", engagement: 25 },
    { category: "SEO", engagement: 20 },
    { category: "Paid Ads", engagement: 10 },
    { category: "Others", engagement: 5 },
  ];

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  return (
    <div className={`w-full p-6 ${ isLight ? 'bg-gray-100' : "bg-gradient-to-r from-slate-900 bg-slate-800 text-white"} min-h-screen`}>
      <h1 className={`text-2xl font-bold mb-4 text-center sm:text-left`}>Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`${ isLight ? "bg-white" : "bg-slate-700 text-slate-200"} shadow-md rounded-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105`}
          >
            <h3 className="md:text-lg text-sm font-semibold">{stat.title}</h3>
            <p className="md:text-3xl font-bold text-blue-500 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traffic Chart */}
        <div className={`${isLight ? "bg-white" : "bg-slate-700 text-slate-200"} shadow-md rounded-lg p-4 sm:p-6 lg:p-8`}>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-4">Traffic Overview</h3>
          <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
            <TrafficChart />
          </div>
        </div>

        {/* Engagement Chart */}
        <div className={`${isLight ? "bg-white" : "bg-slate-700 text-slate-200"} shadow-md rounded-lg p-4 sm:p-6 lg:p-8`}>
          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-4">Engagement by Category</h3>
          <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
            <EngagementChart data={engagementData} />
          </div>
        </div>
      </div>


      {/* Recent Activities */}
      <div className={`${isLight ? "bg-white text-gray-700" : "bg-slate-700 text-slate-200"} shadow-md rounded-lg p-6 mt-8`}>
        <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span>Post updated by Author X</span>
            <span className="text-sm">2 hours ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span>New user registered</span>
            <span className="text-sm">5 hours ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Post approved by Admin</span>
            <span className="text-sm">1 day ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

