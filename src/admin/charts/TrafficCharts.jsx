import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", views: 400 },
  { name: "Feb", views: 800 },
  { name: "Mar", views: 600 },
  { name: "Apr", views: 900 },
  { name: "May", views: 1200 },
];

const TrafficChart = () => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export default TrafficChart;
