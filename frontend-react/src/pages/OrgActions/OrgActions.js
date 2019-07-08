import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';

import Button from "../../components/button/button";
import AdnatHeader from '../../components/AdnatHeader/AdnatHeader';

import './style.css';
import LogOutButton from '../../components/LogOutButton/LogOutButton';

const OrgActions = props => {
    return(

        <Container>
            <Col>
                <AdnatHeader />
                <p>Logged in as {props.currentUser || "John Smith"}</p>
                <LogOutButton onClickLogout={props.onClickLogout}/>
            </Col>
            <br />
            <Col>
                <h1>{props.org || "Bob's Burgers"}</h1>
                <Row>
                <Button variant="link" onClick={props.onClickVS}>View Shifts</Button>
                <Button variant="link">Edit</Button>
                <Button variant="link">Leave</Button>
                </Row>
            </Col>
        </Container>
    )
}

export default OrgActions;