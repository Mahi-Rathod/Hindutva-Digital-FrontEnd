import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const EngagementChart = ({ data }) => {
  // Configure the chart data and options
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Engagement",
        data: data.map((item) => item.engagement),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default EngagementChart;
