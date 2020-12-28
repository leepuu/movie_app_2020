import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./css/reset.css";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

class App extends React.Component {
	render() {
		return (
			<HashRouter>
				<Route path="/" exact={true} component={Home} />
				<Route path="/movie-detail/:name" component={Detail} />
			</HashRouter>
		);
	}
}

export default App;
