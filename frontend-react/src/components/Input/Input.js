import React from "react";
import './style.css'
import { Form } from "react-bootstrap";

import OrgActions from "../../pages/OrgActions/OrgActions";

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
      onChange={props.onChange}
      ></Form.Control>
    </Form.Group>
  </Form>


     
  );
};

export default Input;