import React from "react";
import "./styles.css";

// Import Swiper React components, Swiper styles, Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module
import "swiper/modules/scrollbar/scrollbar.scss";
import "swiper/modules/a11y/a11y.scss";
import SwiperCore, { Pagination, Navigation } from "swiper";

// imports of material UI components
import { Box, Button, Stack, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import BathroomOutlinedIcon from "@mui/icons-material/BathroomOutlined";

//Other imports
import { eachDayWeatherAction } from "../redux/actions/WeatherActions";
import { convertToF, formatDate } from "./Shared";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export default function App({ degree }) {
	const getWeather = useSelector((state) => state.weather);
	const [active, setActive] = React.useState(0);
	const { listSorted } = getWeather;
	const dispatch = useDispatch();

	return (
		<>
			<Box sx={{ pt: "20px" }}>
				<Swiper							//Weather Cards displayed horizontally
					loopFillGroupWithBlank={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					className="mySwiper"
					breakpoints={{
						960: {
							slidesPerView: 3,
							slidesPerColumn: 3,
							slidesPerGroup: 3,
							spaceBetween: 8,
						},
						720: {
							slidesPerView: 2,
							slidesPerColumn: 2,
							slidesPerGroup: 2,
							spaceBetween: 6,
						},
						540: {
							slidesPerView: 1,
							slidesPerColumn: 1,
							slidesPerGroup: 1,
							spaceBetween: 4,
						},
						320: {
							slidesPerView: 1,
							slidesPerColumn: 1,
							spaceBetween: 4,
						},
					}}
				>
					{listSorted?.map((list, id) => (
						<SwiperSlide key={id}>
							<Button
								variant="outined"
								sx={{ textTransform: "capitalize" }}
								onClick={() => {
									setActive(id);
									dispatch(eachDayWeatherAction(id));
								}}
							>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										"& > :not(style)": {
											m: 1,
											width: 250,
											height: 200,
											boxSixing: "border-box",
										},
									}}
								>
									<Paper
										elevation={3}
										sx={id === active ? { backgroundColor: "#ab47bc12" } : ""}
									>
										<div style={{ padding: "10px" }}></div>
										<Typography variant="h6" gutterBottom>
											<ThermostatIcon /> Temperature
										</Typography>
										<Stack
											direction="row"
											justifyContent="space-around"
											alignItems="center"
											spacing={2}
										>
											<Typography sx={{ p: 2 }} variant="h6" gutterBottom>
												{degree === "fahrenheit" ? (
													convertToF(list?.data[0]?.main?.temp)
												) : (
													<span>{list?.data[0]?.main?.temp}&#176;C</span>
												)}
											</Typography>
											<Typography sx={{ p: 2 }} variant="h6" gutterBottom>
												{list?.data[0]?.weather[0]?.main === "Rain" ? (
													<BathroomOutlinedIcon />
												) : list?.data[0]?.weather[0]?.main === "Clouds" ? (
													<CloudOutlinedIcon />
												) : (
													<AcUnitOutlinedIcon />
												)}
											</Typography>
										</Stack>
										<Typography sx={{ p: 2 }} variant="h6" gutterBottom>
											{formatDate(list?.date)}
										</Typography>
									</Paper>
								</Box>
							</Button>
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</>
	);
}
