import React, { Component } from 'react';
import firebase from 'firebase/app';
import {NavLink} from 'react-router-dom';

export default class AccountPage extends Component {
   
  constructor(props) {
    super(props);
    let currentUser = this.props.user;
    this.state = {
      user: currentUser,
      errorText:'Welcome!'
    };
  }

  /**
  * Changes state to reflect the changes being passed in
  * @param {obj} event - the item calling the method
  */
   handleChange = (event) => {
    let field = event.target.name; //which input
    let value = event.target.value; //what value

    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  /**
  * Calls the signup function
  * @param {obj} event - the item calling the method
  */
  signUpBtn = (event) => {
    event.preventDefault(); //don't submit
    this.handleSignUp(this.state.email, this.state.password, this.state.displayName);
  }

  /**
  * Calls the signin function
  * @param {obj} event - the item calling the method
  */
  signInBtn = (event) => {
    event.preventDefault(); //don't submit
    this.handleSignIn(this.state.email, this.state.password);
  }

  /**
  * Callback function that signs the user up with the given details
  * @param {string} email - given user's email
  * @param {string} password - given user's password
  * @param {string} name - given user's username
  */
  handleSignUp = (email, password, name) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredentials => {
      let currentUser = userCredentials.user;
      currentUser.updateProfile({
        displayName: name,
      });
      return userCredentials;
    }).then(promise => {
      this.handleSignOut();
    }).then(promise => {
      this.handleSignIn(email, password);
    }).catch(error => {
      this.setState({error:true, errorText:error.message})
    });
  }

  /**
  * Callback function that signs the user in with the given details
  * @param {string} email - given user's email
  * @param {string} password - given user's password
  */
  handleSignIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(userCredentials => {
      this.setState({user: userCredentials.user});
    }).catch(error => {
      this.setState({error:true, errorText:error.message});
    });
  }

  /**
  * Callback function that logs out the signed in user
  */
  handleSignOut = () => {
    this.props.clearPromptsandName();
    this.setState({user: null, errorText: 'Welcome!'});
    firebase.auth().signOut();
  }

  render() {
    if(this.state.user) { 
      return <WelcomePage user={this.state.user} handleSignOut={this.handleSignOut} />;
    } else {
      return (
        <div className="result w-50 mx-auto">
          <div className="container p-auto mx-auto my-5">
            <p>{this.state.errorText}</p>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" 
                  id="email" 
                  type="email" 
                  name="email"
                  onChange={this.handleChange}
                  />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" 
                  id="password" 
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  />
              </div>

              <div className="form-group">
                <label htmlFor="displayName">Display Name (if signing-up)</label>
                <input className="form-control" 
                  id="displayName" 
                  name="displayName"
                  onChange={this.handleChange}
                  />
              </div>

              {/* buttons */}
              <div className="form-group">
                <button className="btn btn-dark mr-2" onClick={this.signUpBtn}>Sign-up</button>
                <button className="btn btn-dark" onClick={this.signInBtn}>Sign-in</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }

}

class WelcomePage extends Component {
  render() {
    return (
      <div className="result w-50 mx-auto">
        <div className="container p-auto mx-auto my-5">
          <header className="container">
            <h2 className="my-4">
              Welcome, {this.props.user.displayName}!
            </h2>
            <NavLink to="/" role="button" className="btn btn-dark">Go to Homepage</NavLink>
            <button className="btn mx-3 btn-info" onClick={this.props.handleSignOut}>Log out</button>
          </header>
        </div>
      </div>
    );
  }
}