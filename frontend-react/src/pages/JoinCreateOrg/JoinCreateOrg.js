import React from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import TextButton from "../../components/TextButton/TextButton";

import { Col, Container } from 'react-bootstrap';
import "./style.css";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";

const JoinCreateOrg = props => {
  return (
    <Container>
    <Col>
        <AdnatHeader />
    </Col>
    <Col>
        <p>Logged in as {props.currentUser}</p>
        <Button>Log Out</Button>
        <p>You aren't a member of any existing organisations.</p>
        <p>Join an existing one or create a new one.</p>
    </Col>
      <Col>
        <h1>Organisations</h1>
        <ul>
          <li>
            Bob's Burgers <TextButton>Edit</TextButton>{" "}
            <TextButton>Join</TextButton>
          </li>
          <li>
            Moe's Tavern <TextButton>Edit</TextButton>{" "}
            <TextButton>Join</TextButton>
          </li>
          <li>
            Sally's Sandwhiches <TextButton>Edit</TextButton>{" "}
            <TextButton>Join</TextButton>
          </li>
        </ul>
      </Col>
      <Col>
          <h1>Create Organisation</h1>
          <Input title="Name" />
          <Input title="Hourly Rate ($ per hour)" />
          <Button width="55px" height="25px">Update</Button>
          <TextButton>Delete</TextButton>
      </Col>
      </Container>
  );
};

export default JoinCreateOrg;
