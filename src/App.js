import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	NavLink
} from "react-router-dom";
import "./styles/App.css";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";
import PageNotFound from "./components/PageNotFound";
import DocumentTitle from "react-document-title";

export default function App() {
	return (
		<DocumentTitle title="Cooking Companion">
			<Router basename={process.env.PUBLIC_URL}>
				<hr></hr>
				<footer>
					by{" "}
					<a href="https://www.linkedin.com/in/prionti-nasir/">Prionti Nasir</a>{" "}
				</footer>

				<Switch>
					<Route path="/" exact={true} component={HomePage}></Route>
					<Route path="/add" component={RegistrationForm}></Route>
					<Route component={PageNotFound}></Route>
				</Switch>
			</Router>
		</DocumentTitle>
	);
}
