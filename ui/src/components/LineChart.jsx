import Chart from "react-apexcharts";

export default function AreaChart({ chartHeight, lineChartWidth, lineSeries, categories }) {
  const hasNegative = lineSeries.some(s => s.data.some(value => value < 0));

  const areaOptions = {
    chart: {
      id: "area-chart",
      toolbar: { show: false },
      height: chartHeight,
    },
    xaxis: {
      categories: categories,
      labels: {
        show: false, // ✅ hides numbers/text
      },
      axisTicks: {
        show: false, // ✅ hides small tick marks
      },
      axisBorder: {
        show: false, // ✅ hides bottom axis line
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "var(--app-color-50)",
          fontSize: "0.75rem",
        },
      },
    },
    stroke: { curve: "smooth", width: 2 },
    colors: ["var(--accent-color-300)"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.6,
        opacityTo: 0,
        stops: [0, 100],
        inverseColors: hasNegative,
      },
    },
    grid: {
      show: true,
      borderColor: "var(--app-color-900)",
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "12px", fontFamily: "Arial, sans-serif" },
      marker: { show: true },
      y: {
        formatter: (val) => `${val.toFixed(2)}`, // 👈 show formatted y value
        title: {
          formatter: () => "", // 👈 remove the series name if you want just the number
        },
      },
    },
    dataLabels: { enabled: false },
  };

  return (
    <Chart
      options={areaOptions}
      series={lineSeries}
      type="area"
      width={lineChartWidth}
      height={chartHeight}
    />
  );
}
