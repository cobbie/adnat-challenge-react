import React from "react";
import './style.css'
import OrgActions from "../../pages/OrgActions/OrgActions";
export const Input = props => {
  return (
    <div>
      <h5>{props.title}</h5>
      <h5>{props.secondaryText}</h5>
      <input 
      className="inputField" 
      type="text" 
      placeholder=""
      size="20" 
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
