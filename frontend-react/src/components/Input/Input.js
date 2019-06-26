import React from "react";
import './style.css'
import OrgActions from "../../pages/OrgActions/OrgActions";
import { Form } from "react-bootstrap";

const Input = props => {
  return (

  <Form>
    <Form.Group controlId={props.controlId}>
      <Form.Label>{props.title}</Form.Label>
      <Form.Control 
      type={props.type} 
      placeholder={props.placeHolder}
      value={props.value}
      name={props.name}
      onChange={props.onChange}></Form.Control>
    </Form.Group>
  </Form>


    
  );
};

export default Input;


    // <div>
    //       <h5>{props.title}</h5>
    //       <h5>{props.secondaryText}</h5>
    //       <input 
    //       className="inputField" 
    //       type="text" 
    //       placeholder=""
    //       size="20" 
    //       value={props.value}
    //       name={props.name}
    //       onChange={props.onChange}
    //       />
    //     </div> 