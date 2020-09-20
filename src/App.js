import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	NavLink
} from "react-router-dom";
import "./styles/App.css";
import HomePage from "./components/HomePage";
import ConfirmationPage from "./components/ConfirmationPage";
import RegistrationForm from "./components/RegistrationForm";
import PageNotFound from "./components/PageNotFound";
import DocumentTitle from "react-document-title";
import ReviewPage from "./components/ReviewPage";

export default function App() {
	return (
		<DocumentTitle title="WiSTEM Summit 2020">
			<Router basename={process.env.PUBLIC_URL}>
				<hr></hr>
				<footer>
					by{" "}
					<a href="https://www.linkedin.com/in/prionti-nasir/">Prionti Nasir</a>{" "}
				</footer>

				<Switch>
					<Route path="/" exact={true} component={HomePage}></Route>
					<Route path="/register" component={RegistrationForm}></Route>
					<Route path="/review" component={ReviewPage}></Route>
					<Route path="/confirm" component={ConfirmationPage}></Route>
					<Route component={PageNotFound}></Route>
				</Switch>
			</Router>
		</DocumentTitle>
	);
}
