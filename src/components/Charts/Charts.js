import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Charts.modules.css";
const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  //Set the function level state
  const [dailyData, setDailyData] = useState([]);

  //Hooks
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDailyData();

      setDailyData(data);
    };
    console.log(dailyData);

    fetchData();
  }, []);

  //Charts

  const lineCharts = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        text: { display: true, text: `Country: ${country}` },
      }}
    />
  ) : null;
  return (
    <div style={{ width: "70%", display: "flex", justifyContent: "center" }}>
      {country ? barChart : lineCharts}
    </div>
  );
};

export default Charts;
