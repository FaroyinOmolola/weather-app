import axios from "axios";
const API_KEY = "53b5476afbbc4acb13c7c343712f3270";
//created axios instance
const weatherInstance = axios.create({
	baseURL: `https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&units=metric&appid=${API_KEY}`,
});
//using axios instance for https call
export const getWeather = () => {
	return weatherInstance.get();
};
