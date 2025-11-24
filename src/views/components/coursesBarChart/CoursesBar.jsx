import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardBody } from "reactstrap";
import { title } from "process";
const CoursesBar = ({ data, title }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "تعداد",
        data: values,
        backgroundColor: "rgba(45, 140, 255, 0.7)",
        borderRadius: 12,
      },
    ],
  };

  const options = {
    scales: {
      y: { beginAtZero: true },
    },
  };
  return (
    <>
      <Card className="shadow-sm">
        <CardBody>
          <h6 className="mb-3">{title}</h6>
          <Bar data={chartData} options={options} />;
        </CardBody>
      </Card>
    </>
  );
};

export default CoursesBar;
