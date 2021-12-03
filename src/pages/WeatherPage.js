import React, { useEffect, useState } from "react";
import {
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	Box,
	Grid,
	Button,
} from "@mui/material";
import WeatherCard from "../components/WeatherCard";
import WeatherChart from "../components/WeatherChart";
import "./pages.css";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherAction } from "./../redux/actions/WeatherActions";
import Loading from "./Loading";

export default function WeatherPage() {
	//accessing weatherData from redux store
	const getWeather = useSelector((state) => state.weather);
	const { loading } = getWeather;

	const [degree, setDegree] = useState("celcius");
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getWeatherAction());
	}, [dispatch]);

	return (
		<>
			<div className="cover" style={{ padding: "20px" }}>
				{loading ? (
					<Loading /> //loading page
				) : (
					<>
						<Box>
							<Grid container spacing={3}>
								<Grid
									item
									xs={12}
									md={6}
									justifyContent="center"
									alignItems="center"
									display="flex"
								>
									<FormControl component="fieldset">
										<RadioGroup
											row
											aria-label="temperature"
											name="controlled-radio-buttons-group"
											value={degree}
											//onChange={handleChange}
											onChange={(e) => setDegree(e.target.value)}
										>
											<FormControlLabel
												sx={{
													"& .MuiSvgIcon-root": {
														fontSize: 17,
													},
												}}
												value="celcius"
												control={<Radio />}
												label="Celcius"
											/>
											<FormControlLabel
												value="fahrenheit"
												sx={{
													"& .MuiSvgIcon-root": {
														fontSize: 17,
													},
												}}
												control={<Radio />}
												label="Fahrenheit"
											/>
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									justifyContent="center"
									alignItems="center"
									display="flex"
								>
									<Button
										variant="outlined"
										color="primary"
										onClick={() => {
											dispatch(getWeatherAction());
										}}
									>
										Refresh
									</Button>
								</Grid>
							</Grid>
						</Box>
						<WeatherCard degree={degree} />
						<WeatherChart degree={degree} />
					</>
				)}
			</div>
		</>
	);
}
