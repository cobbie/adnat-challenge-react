import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import Button from "../../components/button/button";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";

import "./style.css";
import LogOutButton from "../../components/LogOutButton/LogOutButton";

const OrgActions = props => {
  return (
    <Container>
      <Col>
        <AdnatHeader />
        <p>Logged in as {props.currentUser || "John Smith"}</p>
      </Col>
      <Col>
      <Row>
      <LogOutButton onClickLogout={props.onClickLogout} />
      </Row>
      </Col>
      <br />
      <Col>
        <h1>{props.org || "Bob's Burgers"}</h1>
        <Row>
          <Button variant="link" onClick={props.onClickVS} width="120px">
            View Shifts
          </Button>
          <Button variant="link" onClick={props.onClickEditOrg} width="120px">
            Edit Org
          </Button>
          <Button variant="link" onClick={props.onClickLeave} width="120px">
            Leave
          </Button>
          <Button variant="link" onClick={props.onClickEditUser} width="150px">
            Edit User Info
          </Button>
        </Row>
      </Col>
    </Container>
  );
};

export default OrgActions;
