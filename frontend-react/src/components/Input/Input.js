import React from "react";
import './style.css'
export const Input = props => {
  return (
    <div>
      <h5>{props.title}</h5>
      <h5>{props.secondaryText}</h5>
      <input className="inputField" type="text" placeholder="" size="20" />
    </div>
  );
};

export default Input;
