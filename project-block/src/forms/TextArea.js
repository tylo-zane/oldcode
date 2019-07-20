import React from 'react';

/**
 * Generic textarea for forms 
 */
const TextArea = props => {
	return (
		<div className="form-group">
		  <label htmlFor={props.name} className="form-label">
		  {props.title}
		  </label>
		  <textarea className="form-control"  
		    name={props.name}
		    rows={props.rows}
		    placeholder={props.placeholder}
		    onChange={props.handleChange}
		    />
		</div>
	);
}

export default TextArea;