// Handles ending and palette generation
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// The ending text, prompt, and color palette displayed upon completion of the game.
export default class PromptandPalette extends Component {

   /**
    * @prop {string} ending - The ending text to display
    * @prop {integer} number - number ID representing which ending is displayed
    * @prop {function} handler - handler function so that the App's state can be manipulated
    */
    constructor (props) {
      super(props)
      let colorArray = this.makeColorArray();
      this.state = {
        array: colorArray
      };
      this.props.handler(this.props.number, colorArray, this.props.storyKey);
    }

   /**
    * Creates an array of rgb color codes
    * @returns {string} the generated array of color codes
    */
    makeColorArray() { 
        let output = [];
        let length = 5;
        if(this.props.rgb.length < 5) {
            length = this.props.rgb.length;
        } 
        for (let i = 0; i < length; i++) {
            let colorCode = this.props.rgb[i];
            output.push(colorCode);
        }
        return output;
    }

    /**
    * Clears state then component unmounts
    */
    componentWillUnmount() {
        this.props.clearStateCallback();
    }

    /**
     * Function called that refreshes the color state
     */
    handleClick = () => {
        this.props.clearStateCallback();
    }

    render() {
        return (
            <div className="result w-50 mx-auto">
               <div className="container p-auto mx-auto my-5">
                    <h2>The End</h2>
                    <p>{this.props.ending.endingContent}</p>
                    <p>{this.props.ending.prompt}</p>
                    <h2>Palette</h2>
                    <Palette array={this.state.array} />
                    <div className="mt-5" onClick={this.handleClick}>
                        <Link to='/story-select' className="btn btn-light choice">Play Another Story</Link>
                    </div>
               </div>
            </div>
        );
    }

}

class Palette extends Component {

  /**
   * Generates page elements to represent a palette of colors
   * @returns {string} - generated div containing palette of colors
   */
   render() {
    let colorArray = this.props.array;
    let palette = [];
    for (let i = 0; i < colorArray.length; i++) {
        let rgb = 'rgb(' + colorArray[i].r + ',' + colorArray[i].g + ',' + colorArray[i].b + ')';
        let style = {backgroundColor: rgb};
        let colorBlock = <div key={rgb} style={style} className="palette"></div>;
        palette.push(colorBlock)
    }
    return (
        <div aria-label="Color Palette">
            {palette}
        </div>
    );
}

}