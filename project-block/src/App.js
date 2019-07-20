import React, { Component } from 'react';
import { Route, Switch, NavLink} from 'react-router-dom';
import HomePage from './HomePage.js';
import Story from './Story.js';
import CreateStory from './CreateStory.js';
import PromptandPalette from './PromptandPalette.js'
import SideBar from "react-sidebar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import YourPrompts from './YourPrompts.js';
import ErrorPage from './ErrorPage.js';
import StoryList from './StoryList.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import _ from 'lodash';
import './style.css';
import AccountPage from './AccountPage.js';
import loading from './img/load.png'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingUser: true,
      loadingStories: true,
      sidebarOpen: false,
      prompts: [],
      error: false,
      choiceRGB: [],
      user: undefined,
      stories: {},
      defaultStory:'story/-La32aBIbZ7SLOtgO183/The%20beginning',
      accountName:'Sign In/Sign Up'
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.updateStateHandler = this.updateStateHandler.bind(this);
    this.fetchStories = this.fetchStories.bind(this);
  }

 /**
  * Opens the app's sidebar
  * @param {boolean} open - represents whether the side-bar is open
  */
  onSetSidebarOpen(open) {
      this.setState({ sidebarOpen: open });
  }

  /**
  * Fetches story, ending, and choices data and records them in the App's state.
  */
  componentDidMount() {
    this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) { 
        let promptsRef = firebase.database().ref('users/' + firebaseUser.uid + '/prompts');
        promptsRef.once('value').then(snapshot => {
          let currentPrompts = snapshot.val();
          if (!snapshot.val()) {
            this.setState({
              user: firebaseUser
            });
          } else {
            this.setState({
              user: firebaseUser,
              prompts: currentPrompts
            });
          }
        }).then(promise => {
          this.setState({accountName: firebaseUser.displayName, loadingUser: false});
        });
      } else { //firebaseUser undefined: is not logged in
        this.setState({user: undefined, loadingUser: false});
      }
    });
    this.fetchStories();
  }

  /**
  * Fetch the stories from the database
  */
  fetchStories() {
    let storyRef = firebase.database().ref('stories/');
    storyRef.once('value').then(snapshot => {
      let newStories= snapshot.val();
      this.setState({stories: newStories});
    }).then(this.setState({loadingStories: false}))
    .catch((err) => {
      this.setState({error:true, errorText: err.message})
    });
  }

  /**
  * Removes authentication register when component is removed from screen
  */
  componentWillUnmount() {
    this.authUnregFunc();
  }

  /**
  * Resets the state's RGB Array when the game is played again 
  */
  clearStateRGB = () => {
    this.setState({choiceRGB: []})
  }
  
 /**
  * Records prompts and palettes in the app's state (so that they may be retrieved on the
  * 'Your Prompts' page).
  * @param {string} number - Represents which # of prompt to add to the app's state
  * @param {string} colorArray - Represents a color palette to add to the app's state
  */
  updateStateHandler(number, colorArray, key) {
    let myPrompts = this.state.prompts;
    let prompt = this.state.stories[key].endings[number].prompt;
    myPrompts.push(prompt, colorArray);
    this.setState({prompts: myPrompts})
    if (this.state.user) {
      let userRef = firebase.database().ref('users/' + this.state.user.uid);
      userRef.set({prompts: this.state.prompts});
    }
  }

  clearPromptsandName= () => {
    this.setState({prompts: [], accountName: 'Sign In/Sign Up'});
  }

  /**
  * Saves the rgb code of the choice picked in the app's state, so they can be used to make the palettes.
  * @param {string} choice - represents the choice that was made by the user 
  */
  updateChoice = (choice) => {
    this.setState((currentState) => {
      let foundChoice = _.find(currentState.choiceRGB, ["text", choice]);
      let chosenArray = currentState.choiceRGB;
      return chosenArray.push(choice);
    })
  }

  /**
  * Renders the app's home page.
  * @param {string} routerProps - props to inherit from the react-router parent element
  * @returns {Component} component containing elements of Home Page
  */
  renderCreateStory = (routerProps) => {
    return <CreateStory {...routerProps} fetchCallback={this.fetchStories}/>
  }

 /**
  * Renders the app's home page.
  * @param {string} routerProps - props to inherit from the react-router parent element
  * @returns {Component} component containing elements of Home Page
  */
  renderHome = (routerProps) => {
    return <HomePage {...routerProps} error={this.state.error} playPath={this.state.defaultStory}/>
  }
  
 /**
  * Renders current part of the story that the user is at
  * @param {string} routerProps - props to inherit from the react-router parent element
  * @param {integer} number - a number representing which part of the story to display
  * @returns {Component} - component containing the current part of the story
  */
  renderStory = (key, index) => {
    return <Story chosenCallback={this.updateChoice} story={this.state.stories[key].stories[index]} storyKey={key} />  
  }

 /**
  * Renders ending that the user has reached
  * @param {string} routerProps - props to inherit from the react-router parent element
  * @param {integer} number - a number representing which ending to display
  * @returns {Component} - component containing the ending prompt and palette
  */
  renderEnding = (key, index) => {
      return <PromptandPalette clearStateCallback={this.clearStateRGB} rgb={this.state.choiceRGB} ending={this.state.stories[key].endings[index]} 
      stories={this.state.stories[key].stories} handler={this.updateStateHandler} number={index} storyKey={key}/>;
  }

 /**
  * Renders prompts and palettes obtained by the user
  * @param {string} routerProps - props to inherit from the react-router parent element
  * @param {integer} number - a number representing which ending to display
  * @returns {Component} - component containing the ending
  */
  renderYourPrompts(routerProps) {
    return <YourPrompts {...routerProps} prompts={this.state.prompts} />;
  }

  /**
  * Renders the user's account page if logged in or sign up page 
  * @param {obj} routerProps - props to inherit from react-router parent
  */
  renderAccountPage(routerProps) {
    return <AccountPage {...routerProps} user={this.state.user} clearPromptsandName={this.clearPromptsandName} />;
  }


  /**
  * Renders story or ending based on what is passed in
  */
  renderPart = ({ match }) => {
    let key = match.params.key;
    let path = match.params.path;

    //Go through stories
    for (let i = 0; i < this.state.stories[key].stories.length; i++) {
      if(this.state.stories[key].stories[i].pathName === path) {
        return this.renderStory(key, i)
      } 
    }

    //Go through endings
    for (let i = 0; i < this.state.stories[key].endings.length; i++) {
      if(this.state.stories[key].endings[i].endingName === path) {
        return this.renderEnding(key, i)
      }
    }
  }

  render() {
    if (this.state.loadingUser === true || this.state.loadingStories === true) {
      return (
      <div className="center">
        <img src={loading} alt="Loading symbol" id="loading" />
        <p>Retrieving story data...</p>
      </div>
      )
    } else {
      return (
            <div>
              <SideBar
                rootClassName="disableMouse"
                sidebarClassName="activeMouse"
                overlayClassName="activeMouse"
                children={<div></div>}
                sidebar={
                  <b>
                  <h2 className="sideTitle">Menu</h2>
                  <ul className="list-unstyled components">
                      <li className="active">
                          <NavLink to="/" onClick={this.clearStateRGB}>Home</NavLink>
                      </li>
                      <li>
                          <NavLink to="/prompts" onClick={this.clearStateRGB}>Your Prompts</NavLink>
                      </li>
                      <li>
                          <NavLink to="/story-select" onClick={this.clearStateRGB}>Select A Story</NavLink>
                      </li>
                      <li>
                          <NavLink to="/new-story" onClick={this.clearStateRGB}>Create A Story</NavLink>
                      </li>
                      <li>
                          <NavLink to="/account" onClick={this.clearStateRGB}>{this.state.accountName}</NavLink>
                      </li>
                  </ul>
                  </b>}
                        pullRight={true}
                        open={this.state.sidebarOpen}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={{ sidebar: { background: "black", position: 'fixed', zIndex: 3 } }}
                      >  
              </SideBar>
              <nav className="navbar navbar-expand navbar-dark ml-auto justify-content-end">
                  <div className="topnav navbar-nav d-none d-md-block">
                    <NavLink to="/" className="nav-item d-inline-block nav-link" onClick={this.clearStateRGB}>Home</NavLink>
                    <NavLink to="/prompts" className="nav-item d-inline-block nav-link" onClick={this.clearStateRGB}>Your Prompts</NavLink>
                    <NavLink to="/story-select" className="nav-item d-inline-block nav-link" onClick={this.clearStateRGB}>Select A Story</NavLink>
                    <NavLink to="/new-story" className="nav-item d-inline-block nav-link" onClick={this.clearStateRGB}>Create A Story</NavLink>
                    <NavLink to="/account" className="nav-item d-inline-block nav-link" onClick={this.clearStateRGB}>{this.state.accountName}</NavLink>
                  </div>
                  <div className="topnav navbar-nav"> 
                    <button className="d-md-none d-lg-none d-xl-none" onClick={() => this.onSetSidebarOpen(true)}>
                                <FontAwesomeIcon icon={faBars}/>
                    </button>
                  </div> 
              </nav>
              <Switch>
                <Route exact path='/' render={this.renderHome}/>
                <Route exact path='/prompts' render={() => this.renderYourPrompts()}/>
                <Route exact path='/account' render={(routerProps) => this.renderAccountPage(routerProps)}/>
                <Route exact path='/new-story' render={this.renderCreateStory}/>
                <Route path="/story/:key/:path" component={this.renderPart} />
                <Route path="/story-select" render={() => <StoryList stories={this.state.stories} />} />
              </Switch>
            </div>
        );
      }
  }
}

export default App;