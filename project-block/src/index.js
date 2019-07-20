import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import firebase from 'firebase/app';

// Initialize Firebase
let config = {
	apiKey: "AIzaSyBnvVCak7hkb4nPUk936YMpR0TgtKdKWUE",
	authDomain: "project-block-11.firebaseapp.com",
	databaseURL: "https://project-block-11.firebaseio.com",
	projectId: "project-block-11",
	storageBucket: "project-block-11.appspot.com",
	messagingSenderId: "530447118040"
 };
 firebase.initializeApp(config);

// Render the app
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>, 
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
