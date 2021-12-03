import { getWeather } from "./../../services/services";
import {
	GET_WEATHER_SUCCESS,
	GET_WEATHER_FAIL,
	GET_WEATHER_REQUEST,
	EACH_DAY_WEATHER,
} from "../constants/WeatherConstants";

export const getWeatherAction = () => async (dispatch) => {
	try {
		dispatch({
			type: GET_WEATHER_REQUEST,
		});
		const { data } = await getWeather();
		dispatch({
			type: GET_WEATHER_SUCCESS,
			payload: { data: data, list: data.list },
		});
	} catch (error) {
		dispatch({
			type: GET_WEATHER_FAIL,
			payload: error.message,
		});
	}
};
export const eachDayWeatherAction = (id) => async (dispatch) => {
	try {
		dispatch({
			type: EACH_DAY_WEATHER,
			payload: id,
		});
	} catch (error) {}
};
