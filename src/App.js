import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WeatherPage from "./pages/WeatherPage";

function App() {
	return (
		<>
			<div>
				<Router>
					<Switch>
						<Route path="/" component={WeatherPage} />
					</Switch>
				</Router>
			</div>
		</>
	);
}

export default App;
