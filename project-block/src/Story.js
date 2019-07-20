import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

/**
  * Component containing the current part of the story and its choices
  */
export default class Story extends Component {

	/**
  	 * Function that handles the first choice being clicked on, passing on the choice's color
  	 */
	handleFirstClick = () => {
		this.props.chosenCallback(this.props.story.choices.colorOne);
	}

	/**
  	 * Function that handles the second choice being clicked on, passing on the choice's color
  	 */
	handleSecondClick = () => {
		this.props.chosenCallback(this.props.story.choices.colorTwo);
	}

    render() {
        let choice = [];
        let pathOne = this.props.story.choices.choiceOnePath;
        choice[0] = <NavLink className="mx-3 btn btn-light choice " role="button" key={this.props.story.choices.choiceOne} to={'/story/' + this.props.storyKey + '/' + pathOne}>{this.props.story.choices.choiceOne}</NavLink>

        let pathTwo = this.props.story.choices.choiceTwoPath;
        choice[1] = <NavLink className="mx-3 btn btn-light choice " role="button" key={this.props.story.choices.choiceTwo} to={'/story/' + this.props.storyKey + '/' + pathTwo}>{this.props.story.choices.choiceTwo}</NavLink>
  
        return (
        	<div className="game w-50 mx-auto">
        		<div className="container p-auto mx-auto my-5">
		        	<div className="row justify-content-center">
			        	<div className="col-xs">
			        		<p>{this.props.story.storyContent}</p>
			        	</div>
			        </div>
		        	<div className="row choices justify-content-center">
		        		<ColorPreview color={this.props.story.choices.colorOne}/>
		        		<div onClick={this.handleFirstClick}>
		        			{choice[0]}
		        		</div>
		        		<div onClick={this.handleSecondClick}>
		        			{choice[1]}
		        		</div>
		        		<ColorPreview color={this.props.story.choices.colorTwo}/>
		        	</div>	
	        	</div>
	        </div>
        );  
    }
}

/**
  * Component that creates a small square of the choice's associated color
  */
class ColorPreview extends Component {
	render() {
		let color = this.props.color;
		let rgb = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
		let style = {backgroundColor: rgb};
		return (<div style={style} className="colorSelect"></div>);
	}
}