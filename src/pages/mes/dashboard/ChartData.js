import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export const ChartData = ({ categories, series, type }) => {
  const [chartData, setChartData] = useState({
    options: {},
    series: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setChartData({
          options: {
            chart: {
              id: "basic-bar",
            },
            colors: ['#00E396', '#0090FF'],
            stroke: {
              curve: "smooth",
              width: 3
            },
            xaxis: {
              categories: categories,
            },
            markers: {
              size: 6,
              colors: ['#ffffff'], // 마커 색상 지정
              strokeColors: '#ffffff',
              strokeWidth: 2,
              strokeOpacity: 0.9,
              strokeDashArray: 0,
              fillOpacity: 1,
              discrete: [{
                seriesIndex: 0,
                dataPointIndex: 3,
                strokeColor: '##775DD0',
                size: 6
              }]
            }
          },
          series: [{
            name: "val1",
            data : series,
            }],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categories, series]);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type={type} height={300} />
    </div>
  );
};

export const ChartDataWithSeries = ({ categories, series, type }) => {
  const [chartData, setChartData] = useState({
    options: {},
    series: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setChartData({
          options: {
            chart: {
              id: "basic-bar",
            },
            colors: ['#00E396', '#0090FF'],
            stroke: {
              curve: "smooth",
              width: 3
            },
            xaxis: {
              categories: categories,
            },
            // markers: {
            //   size: 5,
            //   colors: ["#FFA41B"],
            //   strokeColors: "#fff",
            //   strokeWidth: 5,
            //   hover: {
            //     size: 7,
            //   },
            // },
          },
          series: series,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categories, series]);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type={type} height={300} />
    </div>
  );
};

