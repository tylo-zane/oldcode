import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import Popup from "reactjs-popup";

/**
 * Component that displays the stories available to play
 */
export default class StoryList extends Component {

	render() {
		let storyArr = 0;
		if (this.props.stories) {
			let keys = Object.keys(this.props.stories);
			storyArr = keys.map((key) => {
				let path = 'story/' + key + "/" + this.props.stories[key].stories[0].pathName;
				return(
					<div key={this.props.stories[key].storyName} className="story-list-row">
						<p>{this.props.stories[key].storyName}</p>
						<p>{this.props.stories[key].author}</p>
						<NavLink to={path} aria-label="Play Button" role="button" className="btn btn-info btn-md play-btn" href="#">Play Story</NavLink>
						<Popup
								trigger={open => (
								<input className='btn desc-btn' type='button' value='Description' />
								)}
								position="top center"
								closeOnDocumentClick
								contentStyle={{color: 'black'}}
							>
								<span> {this.props.stories[key].storyDescription} </span>
							</Popup>
					</div>	
				);
			})
		}
		if (storyArr === 0) {
			return (
				<div className="container p-auto mx-auto my-5">
					<p>No stories are available.</p>
				</div>
			);
		} else {
			return (
				<div className="container p-auto mx-auto my-5">
					<div className="story-list-row">
						<h2>Story Name</h2>
						<h2>Author</h2>
						<h2 className="play">Play</h2>
					</div>
					{storyArr}	
				</div>
			);
		}
	}
}