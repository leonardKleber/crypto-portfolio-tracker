import Chart from "react-apexcharts";

export default function LineChart({ chartHeight, lineChartWidth, lineSeries, categories }) {
    const lineOptions = {
        chart: {
            id: "line-chart",
            toolbar: { show: false },
            height: chartHeight,
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: "var(--app-color-50)",
                    fontSize: "0.75rem"
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: "var(--app-color-50)",
                    fontSize: "0.75rem"
                }
            }
        },
        stroke: {
            curve: "smooth",
            width: 2
        },
        colors: ["var(--app-color-300)"],
        grid: {
            show: true,
            borderColor: "var(--app-color-900)",
            xaxis: {
                lines: { show: false }
            }
        },
        tooltip: {
            theme: "dark",
            style: { fontSize: "12px", fontFamily: "Arial, sans-serif" },
            marker: { show: true }
        }
    };
    return (
        <Chart options={lineOptions} series={lineSeries} type="line" width={lineChartWidth} height={chartHeight} />
    )
}