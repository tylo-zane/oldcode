import React, { Component } from 'react';
import Input from './Input.js';
import TextArea from './TextArea.js';
import Select from './Select.js';
import { ChromePicker } from 'react-color';

/**
 * Component that handles the story form and calls individual form pieces 
 */
export default class StoryFormContainer extends Component {

    render() {
        return (
            <div>
    		  <Input 
    		  	type={'text'}
  				title={'Story Path Name*'}
  				name={'pathName'}
  				placeholder={'Name this path. Example: The beginning, Road to Bad Ending, etc.'}
				handleChange={(event, index) => this.props.handleStoryChange(event, this.props.index)}
				required
    		  />

    		  <TextArea
    		  	title={'Story Content*'}
    		  	rows={8}
    		  	name={'storyContent'}
    		  	handleChange={(event, index) => this.props.handleStoryChange(event, this.props.index)}
				placeholder={'Type your story here.'}
				required
    		  />

				<div className='choice-container'>
					<Input 
						type={'text'}
						title={'Choice One*'}
						name={'choiceOne'}
						placeholder={'What is the first choice?'}
						handleChange={(event, index) => this.props.handleStoryChange(event, this.props.index)}
						required
					/>

					<Select
						title={"Choice One's Path*"}
						name={"choiceOnePath"}
						options={this.props.options}
						placeholder={"Where does the first choice lead?"}
						handleChange={(event, index) => this.props.handleStoryChange(event, this.props.index)}
                        required
					/>
						
					<div className='my-4 colorChoice'>
						<p>Pick a color for this choice*</p>
						<ChromePicker color={this.props.colorOne} onChangeComplete={(color, event, index, picker) => this.props.handleChangeComplete(color, event, this.props.index, 1)}/>
					</div>
				</div>

				<div className='choice-container'>
					<Input 
						type={'text'}
						title={'Choice Two*'}
						name={'choiceTwo'}
						placeholder={'What is the second choice?'}
						handleChange={(event, index) => this.props.handleStoryChange(event, this.props.index)}
						required
					/>

					<Select
						title={"Choice Two's Path*"}
						name={"choiceTwoPath"}
						options={this.props.options}
						placeholder={"Where does the second choice lead?"}
						handleChange={(event, index) => this.props.handleStoryChange(event, this.props.index)}
						required
					/>

					<div className='my-4 colorChoice'>
						<p>Pick a color for this choice*</p>
						<ChromePicker color={this.props.colorTwo} onChangeComplete={(color, event, index, picker) => this.props.handleChangeComplete(color, event, this.props.index, 2)}/>
					</div>
				</div>

    		</div>
		);
	}
}


