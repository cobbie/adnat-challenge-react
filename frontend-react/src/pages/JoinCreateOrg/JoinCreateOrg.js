import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextButton from "../../components/TextButton/TextButton";

import { Col, Container, ListGroup } from 'react-bootstrap';
import "./style.css";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";
import ListItem from "../../components/ListItem/ListItem";

const JoinCreateOrg = props => {
  return (
    <Container>
    <Col>
        <AdnatHeader />
    </Col>
    <Col>
        <p>Logged in as {props.currentUser}</p>
        <Button variant="link">Log Out</Button>
        <p>You aren't a member of any existing organisations.</p>
        <p>Join an existing one or create a new one.</p>
    </Col>
    <br/>
      <Col>
        <h1>Organisations</h1>

        <ListGroup>
          <ListItem itemText="Bob's Burgers"/>
          <ListItem itemText="Moe's Tavern" />
          <ListItem itemText="Sally's Sandwiches" />
        </ListGroup>
      </Col>
      <br/>
      <Col>
          <h1>Create Organisation</h1>
          <Input title="Name" />
          <Input title="Hourly Rate ($ per hour)" />
          <Button>Update</Button>
          <Button variant="link">Delete</Button>
      </Col>
      <br/>

      </Container>
  );
};

export default JoinCreateOrg;
