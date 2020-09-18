import React from "react";
import { withRouter } from 'react-router-dom';
import "../styles/HomeAndNotFound.css";
import DocumentTitle from "react-document-title";



export default class ReviewPage extends React.Component {
	handleConfirm = () => {
		this.props.history.push('/confirmation');
	}
	render() {
		return (
		<DocumentTitle title="Review Your Information">
			<div className="review">
				
			<button onClick={this.props.history.goBack}>Back</button>
            <button className="button" onClick={this.handleSubmit}>Submit</button>
			</div>
		</DocumentTitle>
	);
	}
}
