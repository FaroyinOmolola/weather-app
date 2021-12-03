import React from "react";
//imports using chartjs and react-chart-js for Weather Chart display
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
//Other imports
import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { formatDate, convertToFarenheit } from "./Shared";

export default function WeatherChart({ degree }) {
	//accessing weatherData from redux store
	const getWeather = useSelector((state) => state.weather);
	const { eachDay, listSorted } = getWeather;

	//extracting daily weather details
	const getDailyDetails = !eachDay && listSorted ? listSorted[0] : eachDay;
	const dailyTemperature = getDailyDetails?.data?.map((dt) => {
		return degree === "fahrenheit"
			? convertToFarenheit(dt?.main?.temp)
			: dt?.main?.temp;
	});
	const getLabel = getDailyDetails?.data?.map((dt) => {
		return new Date(`${dt?.dt_txt}`).toTimeString().split(" ")[0];
	});

	return (
		<div style={{ margin: "20px 0" }}>
			<Paper elevation={4} mt={2} sx={{ p: "15px" }}>
				<Bar
					data={{
						labels: getLabel,
						datasets: [
							{
								label: degree === "fahrenheit" ? "Farenheit" : "Celcius",
								data: dailyTemperature,
								backgroundColor: "#AB47BC",
								borderColor: "#C2185B",
								borderWidth: 1,
							},
						],
					}}
					height={400}
					width={600}
					options={{
						maintainAspectRatio: false,
						scales: {
							y: {
								beginAtZero: true,
							},
						},

						plugins: {
							legend: {
								display: true,
								labels: {
									color: "rgb(255, 99, 132)",
									fontSize: "200px",
								},
							},
							title: {
								display: true,
								text: formatDate(getDailyDetails?.date) + " Temperature Chart",
								padding: {
									top: 10,
									bottom: 30,
								},
								fontSize: 25,
							},
						},
					}}
				/>
			</Paper>
		</div>
	);
}
