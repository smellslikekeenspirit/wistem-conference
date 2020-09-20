import React from "react";
import "../styles/HomeConfirmationAndNotFound.css";
import DocumentTitle from "react-document-title";



export default class HomePage extends React.Component {
	handleClick = () => {
		sessionStorage.clear();
		this.props.history.push('/register');
	}

	render() {
		return (
		<DocumentTitle title="Home Page">
			<div className="homePage">
				<h1>
					<mark> Women In STEM Summit 2020 </mark>
				</h1>
				<h2><mark>September 18th  - September 20th </mark></h2>
				<h2><mark>Boston, MA.</mark></h2>
				<button className="button" onClick={this.handleClick}>Register!</button>
			</div>
		</DocumentTitle>
	);
	}
}
