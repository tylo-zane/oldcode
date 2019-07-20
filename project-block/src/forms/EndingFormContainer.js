import React, { Component } from 'react';
import Input from './Input.js';
import TextArea from './TextArea.js';

/**
 * Component that handles the ending form and calls individual form pieces 
 */
export default class EndingFormContainer extends Component {

	render() {
		return (
			<form>
    		  <Input 
    		  	type={'text'}
		  				title={'Ending Name*'}
		  				name={'endingName'}
		  				placeholder={'Name this ending. Example: bad ending, good ending, etc.'}
						handleChange={(event, index) => this.props.handleEndingChange(event, this.props.index)}
						required
    		  />

    		  <TextArea
    		  	title={'Ending*'}
    		  	rows={5}
    		  	name={'endingContent'}
    		  	handleChange={(event, index) => this.props.handleEndingChange(event, this.props.index)}
				placeholder={'Type the ending here.'}
				required
    		  />

              <TextArea
                title={'Prompt*'}
                rows={3}
                name={'prompt'}
                handleChange={(event, index) => this.props.handleEndingChange(event, this.props.index)}
					 placeholder={'Type this ending\'s drawing prompt here.'}
					 required
              />
    		</form>
		);
	}
}
