import React, { Component } from 'react';
import {Link} from 'react-router-dom';

/**
 * Component that displays when an error occurs
 */
export default class Story extends Component {
	render() {
		return (
			<div className="error container p-auto mx-auto my-5">
				<div>
					<h2>There has been an error</h2>
				</div>
				<div>
					<p>{this.props.errorText}</p>
				</div>
				<div>
					<p>Try reloading the page</p>
				</div>
				<div>
	                <button className="mt-5"><Link to="/">Reload</Link></button>
	            </div>
			</div>
		);
	}
}