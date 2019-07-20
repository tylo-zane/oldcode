import React, { Component } from 'react';
import Input from './forms/Input.js';
import TextArea from './forms/TextArea.js';
import {NavLink} from 'react-router-dom';
import StoryFormContainer from './forms/StoryFormContainer.js';
import EndingFormContainer from './forms/EndingFormContainer.js';
import Collapsible from 'react-collapsible';
import firebase from 'firebase/app';
import Popup from "reactjs-popup";
import 'firebase/database';

export default class CreateStory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			storyName:'',
			storyDescription:'',
			author: '',
			options:[],
			stories:[],
			endings:[],
			popup: 'You must fill in all empty fields before submitting.'
		}
	}

	componentDidMount() {
		this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
			let authorName = '';
			if(firebaseUser){ 
				authorName = firebaseUser.displayName;
			}
			this.setState({
				author: authorName,
			});
		});
	}

	componentWillUnmount() {
		this.authUnregFunc();
		this.props.fetchCallback();
	 }

	updateColorState = (color, event, index, picker) => {
		this.setState((prevState) => {
			if(picker === 1) {
				prevState.stories[index].choices.colorOne = color.rgb;
			} else {
				prevState.stories[index].choices.colorTwo = color.rgb;
			}
			return prevState;
		});
	}

	handleChangeComplete = (color, event, index, picker) => {
		this.updateColorState(color, event, index, picker);
	}

	//update state for specific field 
	handleChange = (event, index) => {
	  this.setState({[event.target.name] : event.target.value}); //update state
	}

	handleStoryChange = (event, index) => {
		const stories = this.state.stories;
		if(event.target.name === "pathName") {
			stories[index].pathName = event.target.value;
			this.updateOptions();
		}
		if(event.target.name === "storyContent") {
			stories[index].storyContent = event.target.value;
		} 
		if(event.target.name === "choiceOne") {
			stories[index].choices.choiceOne = event.target.value;
		}
		if(event.target.name === "choiceTwo") {
			stories[index].choices.choiceTwo = event.target.value;
		}
		if(event.target.name === "choiceOnePath") {
			stories[index].choices.choiceOnePath = event.target.value;
		}
		if(event.target.name === "choiceTwoPath") {
			stories[index].choices.choiceTwoPath = event.target.value;
		}
		this.setState({stories});
	}

	handleEndingChange = (event, index) => {
		const endings = this.state.endings;
		if(event.target.name === "endingName") {
			endings[index].endingName = event.target.value;
			this.updateOptions();
		} 
		if(event.target.name === "prompt") {
			endings[index].prompt = event.target.value;
		} 
		if(event.target.name === "endingContent") {
			endings[index].endingContent = event.target.value;
		} 
		this.setState({endings});
	}

	updateOptions() {
		let options = [];
		this.state.stories.map((story) => {
			options.push(story.pathName)
			return story;
		});
		this.state.endings.map((ending) => {
			options.push(ending.endingName)
			return ending;
		});
		this.setState({options: options});
	}

	addStory = () => {
		this.setState(prevState => ({stories: [...prevState.stories, 
			{
			collapse: {},
			pathName:'',
			storyContent:'',
			choices: {
				choiceOne:'',
				choiceOnePath:'',
				colorOne: {
					r:25,
					g:25,
					b:25,
					a:100
				},
				choiceTwo:'',
				choiceTwoPath:'',
				colorTwo: {
					r:50,
					g:50,
					b:50,
					a:100
				}
			}
		}]}))
		this.updateOptions();
	}

	removeStory(index){
		let stories = [...this.state.stories];
		stories.splice(index, 1);
		this.setState({stories});
	}

	addEnding = () => {
		this.setState(prevState => ({endings: [...prevState.endings,
			{
				endingName:'',
				endingContent:'',
				prompt:''
			}
		]}))
		this.updateOptions();
	}

	removeEnding(index){
		let endings = [...this.state.endings];
		endings.splice(index, 1);
		this.setState({endings});
	}

	renderStoryForm() {
		return this.state.stories.map((element, index) => 
			<div key={'story' + index} className='my-5 border-top border-white story-form'>
				<h2 className='my-3'>Path-{index}<em aria-label="path title">{" " + this.state.stories[index].pathName}</em></h2>
				<Collapsible trigger={<button className='collapse-btn'>Show/Hide</button>} >
					<StoryFormContainer handleStoryChange={this.handleStoryChange} handleChange={this.handleChange}  
					colorOne={this.state.stories[index].choices.colorOne} colorTwo={this.state.stories[index].choices.colorTwo} 
					options={this.state.options} handleChangeComplete={this.handleChangeComplete} index={index}/>
					<input className="dark-btn" type='button' value='Remove this path' onClick={this.removeStory.bind(this, index)} />
				</Collapsible>
			</div>
		);
	}
  
  	renderEndingForm() {
		return this.state.endings.map((element, index) => 
			<div key={'ending' + index} className='my-5 border-top border-white story-form'>
				<h2 className='my-3'>Ending-{index} <em aria-label="ending title">{this.state.endings[index].endingName}</em></h2>
				<Collapsible trigger={<button className='collapse-btn'>Show/Hide</button>}>
					<EndingFormContainer handleEndingChange={this.handleEndingChange} index={index} />
					<input className="dark-btn" type='button' value='Remove this ending' onClick={this.removeEnding.bind(this, index)} />
				</Collapsible>
			</div>
		);
	}

	submitStory = () => {
		let forms = (document.querySelectorAll('input, select, textarea'));
		let isValid = true;
		for (let i = 0; i < forms.length; i++) {
			if (forms[i].value === null || forms[i].value === undefined || forms[i].value === "" ) {
				isValid = false;
			}
		}
		if (isValid) {
			if(this.state.stories.length > 1 && this.state.endings.length > 0) {
				let storyRef = firebase.database().ref('stories/');
				storyRef.push(this.state);
				this.setState({popup: 'Successfully uploaded your story to the catalogue!'});
			} else {
				this.setState({popup: 'You must have at least 2 story paths and 1 ending.'});
			}
		}  else {
			this.setState({popup: 'You must fill in all empty fields before submitting.'});
		} 
	}

  render() {
	  	if (this.state.author === "") {
			  return (
					<div className="container p-auto mx-auto my-5">
						<h2>Notice:</h2>
						<p>You must be logged in to use the Create Story feature.</p>
						<p>If you have yet to do so, please create an account. It's free and takes only seconds!</p>
						<NavLink to="/account" className="btn dark-btn">Sign in / Sign up</NavLink>
					</div>
			  );
		} else {
			return(
				<div>
					<div className="mx-auto" id="story-form">
					<div className="container p-auto mx-auto my-5">
							<p className="warningText">*required</p>
							<p className="warningText">To avoid story errors, do not name the story path names and ending path names the same.</p>
							<h2>Make a story</h2>>
								<form>
								<Input 
									type={'text'}
										title={'Story Name*'}
										name={'storyName'}
										placeholder={'Put your story\'s name here!'}
										handleChange={this.handleChange}
								/>
								<TextArea 
									type={'text'}
										title={'Story Description*'}
										rows={5}
										name={'storyDescription'}
										placeholder={'What is your story about?'}
										handleChange={this.handleChange}
								/>
								</form>
										{this.renderStoryForm()}
								{this.renderEndingForm()}
							</div>
							<input className='mx-3 btn dark-btn' type='button' value='Add a story path' onClick={this.addStory.bind(this)} />
							<input className='mx-3 btn dark-btn' type='button' value='Add an ending' onClick={this.addEnding.bind(this)} />
							<Popup
								trigger={open => (
								<input className='mx-3 btn dark-btn' type='button' value='Submit Story' />
								)}
								position="top center"
								closeOnDocumentClick
								contentStyle={{color: 'black'}}
								onOpen={this.submitStory}
							>
								<span> {this.state.popup} </span>
							</Popup>
					</div>
				</div>
			);
		}
   }

}