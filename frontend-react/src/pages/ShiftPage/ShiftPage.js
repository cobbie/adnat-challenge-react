import React from 'react';
import {Container, Table, Row, Col} from 'react-bootstrap';

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'


import './style.css'
import AdnatHeader from '../../components/AdnatHeader/AdnatHeader';

const ShiftPage = props => {
    return(
        <Container>
            <Col>
            <AdnatHeader />
            </Col>
            <br />
            <Col>
            <p>Logged in as John Smith.</p><Button variant="link">Log out</Button>
            </Col>
            <br />
            <Col>
                <h1>Bob's Burgers</h1>
                <h3>Shifts</h3>
                <Table striped border="true" hover>
            <thead>
                <tr>
                    <th>Employee name</th>
                    <th>Shift date</th>
                    <th>Start time</th>
                    <th>Finish time</th>
                    <th>Break length (minutes)</th>
                    <th>Hours worked</th>
                    <th>Shift cost</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                    </tr>
                    <tr>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                    </tr><tr>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                    </tr><tr>
                        <td>temp</td>
                        <td><Input /></td>
                        <td><Input /></td>
                        <td><Input /></td>
                        <td><Input /></td>
                        <td colSpan="2"><Button variant="info" width="125px">Create shift</Button></td>
                    </tr>
                </tbody>

                </Table>

            </Col>
            <br />
        </Container>
   )
}

export default ShiftPage;