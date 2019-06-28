import React from "react";
import { Col, Container } from 'react-bootstrap';

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";

const EditOrg = props => {
  return (
    <Container>
    <Col>
        <AdnatHeader />
    </Col>
    <Col>
        <p>Logged in as {props.currentUser}</p>
        <Button variant="link">Log Out</Button>
    </Col>
    <br/>
      <br/>
      <Col>
          <h1>Edit Organisation</h1>
          <Input title="Name" 
          value={props.nameValue}
          onChange={props.nameOnChange}
          name={props.nameName}/>

          <Input title="Hourly Rate ($ per hour)"
          value={props.rateValue}
          onChange={props.rateOnChange}
          name={props.rateName}
           />
          <Button onClick={props.onClick}>Update</Button>
          <Button variant="link">Delete</Button>
      </Col>
      </Container>
  );
};

export default EditOrg;
