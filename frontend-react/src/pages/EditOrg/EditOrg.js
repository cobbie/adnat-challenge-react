import React from "react";
import { Col, Container } from 'react-bootstrap';

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";
import LogOutButton from "../../components/LogOutButton/LogOutButton"

const EditOrg = props => {
  return (
    <Container>
    <Col>
        <AdnatHeader 
          onClick={props.onClickHeader}
        />
    </Col>
    <Col>
        <p>Logged in as {props.currentUser}</p>
        <LogOutButton onClickLogout={props.onClickLogout}/>
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
          <Button onClick={props.onClickUpdate}>Update</Button>
          <Button variant="link" onClick={props.onClickDelete}>Delete</Button>
      </Col>
      </Container>
  );
};

export default EditOrg;
