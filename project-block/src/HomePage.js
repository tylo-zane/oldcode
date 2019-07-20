import React, { Component } from 'react';
import { NavLink} from 'react-router-dom';
import ErrorPage from './ErrorPage.js';

/**
 * The application's home page structure
 */
export default class HomePage extends Component {
  render() {
    if(this.props.error) {
        return (
            <ErrorPage />
        );
    } else {
        return (
              <div>
                <main>
                    <div className="home">
                        <div className="jumbotron jumbortron-fluid parallax vertical-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col mx-auto" >
                                        <h1>BLOCK</h1>
                                        <NavLink to={this.props.playPath} role="button" className="btn btn-info btn-lg mx-3" aria-label="Quick Play Button">Quick Play</NavLink>
                                        <NavLink to="/story-select" role="button" className="btn btn-dark btn-lg mx-3" aria-label="Select Story Button">Story Select</NavLink>
                                        <NavLink to="/new-story" role="button" className="btn btn-dark btn-lg mx-3" aria-label="Create Story Button">Create New Story</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container p-auto mx-auto my-5">
                            <header>
                                <HomePageInfo></HomePageInfo>
                            </header>
                        </div>
                    </div>
                </main>
                <footer>
                    <HomePageFooter></HomePageFooter>
                </footer>
              </div>
        );
    }
  }
}

class HomePageInfo extends Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-xs col-lg-4">
                    <h2>About</h2>
                    <p>
                    Block is a website that hosts choose your own adventure games that are designed to help you, the player, with artist's block. Choose from a variety of user-generated stories; upon reaching the end of a route, you will be rewarded with a prompt and a color palette.
                    </p>
                    <p>
                    The game can be played when you want inspiration for something to draw or you just want to have some fun. The prompt's color palette you receive is determined by choices you made throughout a story.
                    </p>
                </div>
                <div className="col-xs col-lg-4">
                    <h2>How To Play</h2>
                    <p>
                    Playing Block only requires a mouse or a touchscreen in order to be able to select your choices.
                    </p>
                    <h3>Do I need an account to play?</h3>
                    <p>
                    No, an account is not necessary. Having an account saves your palettes and prompts to your account, which you can access at the <a href="/prompts">Your Prompts</a> page.
                    </p>
                </div>
                <div className="col-xs col-lg-4">
                    <h2>How To Make a Story</h2>
                    <p>
                    Registered users can create stories at the <a href="/new-story">Create a Story</a> page. There you will find a form where you can create different story paths and endings. 
                    </p>
                    <ul className="list-unstyled">
                        <li>Create branching stories with the dynamic story form</li>
                        <li>Pick a color for each choice</li>
                        <li>Publish stories for others to play</li>
                    </ul>
                </div>
            </div>
        );
    }
}

// The application's Home page footer
class HomePageFooter extends Component {
    render() {
        return (
            <div className="container">
                <div className="row text-center">
                    <div className="col footer-text my-2">
                        <p>&copy; Carmelito Gutierrez, Andy Tillotson, Tyler Marcinyshyn</p>
                        <p>UW iSchool | INFO 340</p>
                    </div>
                </div>
            </div>
        );
    }
}
