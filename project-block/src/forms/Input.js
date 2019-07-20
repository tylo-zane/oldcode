import React from 'react';

/**
 * Generic Input for a form
 */
const Input = props => {
	return (
		<div className="form-group">
		  <label htmlFor={props.name} className="form-label">
		  {props.title}
		  </label>
		  <input className="form-control"  
		    name={props.name}
		    type={props.inputType}
		    placeholder={props.placeholder}
		    onChange={props.handleChange}
		    {...props}
		    />
		</div>
	);
}

export default Input;