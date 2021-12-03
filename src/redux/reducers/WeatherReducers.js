import {
	GET_WEATHER_SUCCESS,
	GET_WEATHER_FAIL,
	GET_WEATHER_REQUEST,
	EACH_DAY_WEATHER,
} from "../constants/WeatherConstants";
import { dateSaparation } from "./../../components/Shared";

export const WeatherReducer = (state = "", action) => {
	switch (action.type) {
		case GET_WEATHER_REQUEST:
			return { ...state, loading: true, success: false };

		case GET_WEATHER_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				weatherData: action.payload.data,
				weatherList: action.payload.list,
				listSorted: dateSaparation(action.payload.list),
			};
		case GET_WEATHER_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};
		case EACH_DAY_WEATHER:
			return {
				...state,
				loading: false,
				success: false,
				eachDay: state.listSorted[action.payload],
			};
		default:
			return state;
	}
};
