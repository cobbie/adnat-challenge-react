import React from "react";
import { Col, Container, ListGroup, Row} from 'react-bootstrap';

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";
import ListItem from "../../components/ListItem/ListItem";
import LogOutButton from "../../components/LogOutButton/LogOutButton";

import "./style.css";

const JoinCreateOrg = props => {

  return (
    <Container>
    <Col>
        <AdnatHeader 
          onClick={props.onClickHeader}
        />
    </Col>
    <Col>
        <p>Logged in as {props.currentUser}</p>
        </Col>
        <Row>
          <Col>
          <LogOutButton onClickLogout={props.onClickLogout} />
          </Col>
        </Row>
          <Col>
        <p>You aren't a member of any existing organisations.</p>
        <p>Join an existing one or create a new one.</p>
    </Col>
    <br/>
      <Col>
        <h1>Organisations</h1>

        <ListGroup>
        {props.orgs.map((val, ind) => {
          console.log('val[1]', val[1])
          return <ListItem 
                  ind={ind} 
                  key={ind} 
                  itemText={val[0]}
                  orgId={val[1]} 
                  onClickJoin={() => {props.onClickJoin(ind + 1)}}
                  onClickEdit = {() => props.onClickEdit(val[1])}
                  />
          
          })}
        </ListGroup>
      </Col>
      <br/>
      <Col>
          <h1>Create Organisation</h1>
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
      <br/>

      </Container>
  );
};

export default JoinCreateOrg;
