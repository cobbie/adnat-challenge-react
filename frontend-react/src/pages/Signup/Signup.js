import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";

import "./style.css";

const Signup = props => {
  return (
    <Container>
      <Col>
        <AdnatHeader />
      </Col>
      <br />
      <Col>
        <h1>Sign up</h1>
      </Col>
      <Col>
        <Input
          title="Name"
          value={props.nameValue}
          onChange={props.nameOnChange}
          name={props.nameName}
          defaultValue={"TEST NAME"}
          placeHolder="Enter your name"
        />
      </Col>
      <Col>
        <Input
          title="Email"
          value={props.emailValue}
          onChange={props.emailOnChange}
          name={props.emailName}
          placeHolder="Enter your email here"
        />
      </Col>
      <Col>
        <Input
          title="Password (Min. 6 characters)"
          value={props.passwordValue}
          onChange={props.passwordOnChange}
          name={props.passwordName}
          secondaryText="6 characters minimum"
          placeHolder="Enter your password here"
        />
      </Col>
      <Col>
        <Input
          title="Password confirmation"
          value={props.passwordConfirmValue}
          onChange={props.passwordConfirmOnChange}
          name={props.passwordConfirmName}
          placeHolder="Confirm your password"
        />
      </Col>
      <br />

      <Col>
        <Button variant="secondary" onClick={props.onClick}>
          Sign up
        </Button>
      </Col>
      <Col>
        <Button variant="link" onClick={props.onClickLogin}>Login</Button>
      </Col>
    </Container>
  );
};

export default Signup;
