import React from 'react';
import Button from "../../components/button/button";

import './style.css';
import {Container, Col, Row} from 'react-bootstrap';
import AdnatHeader from '../../components/AdnatHeader/AdnatHeader';
const OrgActions = props => {
    return(

        <Container>
            <Col>
                <AdnatHeader />
                <p>Logged in as {props.name || "John Smith"}</p>
                <Button variant="secondary">Log Out</Button>
            </Col>
            <br />
            <Col>
                <h1>{props.org || "Bob's Burgers"}</h1>
                <Row>
                <Button variant="link">View Shifts</Button>
                <Button variant="link">Edit</Button>
                <Button variant="link">Leave</Button>
                </Row>
            </Col>
        </Container>
    )
}

export default OrgActions;