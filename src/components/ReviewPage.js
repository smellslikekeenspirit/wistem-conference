import React from "react";
import "../styles/ReviewPage.css";
import DocumentTitle from "react-document-title";



export default class ReviewPage extends React.Component {
	handleConfirm = () => {
		this.props.history.push('/confirm');
	}
	render() {
		return (
		<DocumentTitle title="Review Your Information">
			<div className="wrapper">
				<div className="box">
					<div className="parsedForm">
					<p><label>First Name: </label>{sessionStorage.firstName}</p>
					<p><label>Last Name: </label>{sessionStorage.lastName}</p>
					<p><label>Street address: </label>{sessionStorage.streetAddress}</p>
					<p><label>City: </label>{sessionStorage.city}</p>
					<p><label>State: </label>{sessionStorage.state}</p>
					<p><label>Zipcode: </label>{sessionStorage.zipcode}</p>
					<p><label>Email address: </label>{sessionStorage.email}</p>
					<p><label>Organization: </label>{sessionStorage.organization}</p>
					<p><label>Status: </label>{sessionStorage.status}</p>
					<p><label>Payment Method: </label>{sessionStorage.paymentMethod}</p>
					</div>
					<div className="row">
					<button className="button" onClick={this.props.history.goBack}>Back</button>
					<button className="button" onClick={this.handleConfirm}>Submit</button>
					</div>
				</div>	
				
			</div>
		</DocumentTitle>
	);
	}
}
