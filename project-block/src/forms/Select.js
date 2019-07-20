import React from "react";

/**
 * Generic Select for a form
 */
const Select = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}> {props.title} </label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className="form-control"
      >
        <option value="">
          {props.placeholder}
        </option>
        {props.options.map((option, index) => {
          return (
            <option key={index + props.name} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;