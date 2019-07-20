import React, { Component } from 'react';

/**
 * List of prompts and palettes displayed on the 'Your Prompts' page
 */
export default class YourPrompts extends Component {

   render() {
      let list = <p>You have no prompts to display. Try playing the game to collect more prompts.</p>;
      if (this.props.prompts.length !== 0) {
         list = this.props.prompts.map((prompt, index) => {
            if (prompt[0][0] === undefined) {
               let palette = [];
               for (let i = 0; i < prompt.length; i++) {
                     let rgb = 'rgb(' + prompt[i].r + ',' + prompt[i].g + ',' + prompt[i].b + ')';
                     let style = {backgroundColor: rgb};
                     let colorBlock = <div key={prompt[i].r} style={style} className="palette"></div>;
                     palette.push(colorBlock)
               }
               return (
                     <div key={index} aria-label="Color Palette">
                        {palette}
                     </div>
               );
            } else {
               return <p key={prompt + index}>{prompt}</p>;
            }   
            
         });
      }
      return (
         <div className="container p-auto mx-auto my-5">
            <h2>Your Prompts</h2>
            {list}
         </div>
      );
   }
}