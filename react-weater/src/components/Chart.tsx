import axios from "axios";
import { useEffect, useState } from "react";
import { ChartType } from "../types/ChartTypes";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Loader } from "./Loader";
import '../assets/styles/CityForecastInfo.scss';

export const Chart: React.FC<ChartType> = ({ lat, lon, name }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY || "2ca6774e04c3e69ed3c5702f52b3da53"}&units=metric`
      );

      const list = response.data.list;

      const labels = list.map((item: any) => item.dt_txt);
      const temperatures = list.map((item: any) => item.main.temp);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Temprature (°C)",
            data: temperatures,
            fill: true,
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.4,
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [lat, lon]);

  return (
    <div>
      <h2>5-day tempreature chart in {name}</h2>
      {loading ? (
        <Loader />
      ) : chartData ? (
        <Line data={chartData} />
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};
