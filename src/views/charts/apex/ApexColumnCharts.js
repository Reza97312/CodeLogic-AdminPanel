// ** Third Party Components
import Chart from "react-apexcharts";
import Flatpickr from "react-flatpickr";
import { Calendar } from "react-feather";

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";

const ApexColumnCharts = ({ direction }) => {
  const columnColors = {
    series1: "#826af9",
    series2: "#d2b0ff",
    bg: "#f8d3ff",
  };

  // ** Chart Options
  const options = {
    chart: {
      type: "bar",
      stacked: true,
      height: 350,
      toolbar: { show: false },
      rtl: true,
      fontFamily: "Vazir, Arial, sans-serif",
    },
    plotOptions: {
      bar: {
        columnWidth: "35%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "start",
    },
    colors: [columnColors.series1, columnColors.series2],
    stroke: {
      show: true,
      colors: ["transparent"],
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val) {
          const date = new Date(val);
          const persianMonths = [
            "فروردین",
            "اردیبهشت",
            "خرداد",
            "تیر",
            "مرداد",
            "شهریور",
            "مهر",
            "آبان",
            "آذر",
            "دی",
            "بهمن",
            "اسفند",
          ];
          return persianMonths[date.getMonth()] + " " + date.getDate();
        },
      },
    },
    fill: {
      opacity: 1,
    },
    yaxis: {
      opposite: true, // معمولاً برای RTL
    },
    legend: {
      horizontalAlign: "right",
    },
  };

  // ** Chart Series
  const series = [
    {
      name: "Apple",
      data: [90, 120, 55, 100, 80, 125, 175, 70, 88, 180],
    },
    {
      name: "Samsung",
      data: [85, 100, 30, 40, 95, 90, 30, 110, 62, 20],
    },
  ];

  return (
    <Card>
      <CardHeader className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start">
        <CardTitle tag="h4">Data Science</CardTitle>
        <div className="d-flex align-items-center mt-md-0 mt-1">
          <Calendar size={17} />
          <Flatpickr
            className="form-control flat-picker bg-transparent border-0 shadow-none"
            options={{
              mode: "range",
              // eslint-disable-next-line no-mixed-operators
              defaultDate: [
                new Date(),
                new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
              ],
            }}
          />
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="bar" height={400} />
      </CardBody>
    </Card>
  );
};

export default ApexColumnCharts;
