import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { GetDashboardTechReport } from "../../../core/services/api/get/GetDashboardTechReport";
import loading from "../../../assets/images/A/loading.gif";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const CommentCharts = () => {
  const { data: techData = [], isPending } = useQuery({
    queryKey: ["TECHREPORT"],
    queryFn: () => GetDashboardTechReport(),
  });
  const formattedData = techData.reduce((Acc, items) => {
    Acc[items.techName] = items.countUsed;
    return Acc;
  }, {});
  const labels = Object.keys(formattedData);
  const values = Object.values(formattedData);

  if (!formattedData || Object.keys(formattedData).length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        داده‌ای موجود نیست
      </p>
    );
  }
  const chartData = {
    labels,
    datasets: [
      {
        label: "تعداد استفاده از تکنولوژی",
        data: values,
        backgroundColor: "rgba(0, 140, 120, 0.2)",
        borderColor: "rgba(0, 140, 120, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(0, 140, 120, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(0, 140, 120, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#555",
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        angleLines: { color: "#eee" },
        grid: { color: "#eee" },
        suggestedMin: 0,
        pointLabels: {
          color: "#555",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div style={{ height: 350, width: "100%" }}>
      {isPending ? (
        <img className="mx-auto" src={loading} />
      ) : (
        <Radar data={chartData} options={options} />
      )}
    </div>
  );
};

export default CommentCharts;
