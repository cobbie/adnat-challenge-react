import React, { Component } from 'react';
import {Container, Table, Row, Col} from 'react-bootstrap';

import AdnatHeader from '../../components/AdnatHeader/AdnatHeader';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import LogOutButton from '../../components/LogOutButton/LogOutButton';

import './style.css'

class ShiftPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shiftDateInput: '',
            startTimeInput: '',
            finishTimeInput: '',
            breakInput: ''
         }
    }

    componentDidUpdate = () => {
        console.table(this.state);
    }

    handleInput = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    renderEmployees = () => {
        console.log('wenkwonk');
    }

    render() { 
        return ( 
            <Container>
            <Col>
            <AdnatHeader />
            </Col>
            <br />
            <Col>
            <p>Logged in as {this.props.currentUser}.</p>
            <LogOutButton onClickLogout={this.props.onClickLogout}/>
            </Col>
            <br />
            <Col>
                <h1>{this.props.org || 'Bob\'s Burgers'}</h1>
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
                        <td><Input 
                            name="shiftDateInput"
                            value={this.state.shiftDateInput}
                            onChange={this.handleInput}
                        /></td>
                        <td><Input 
                            name="startTimeInput"
                            value={this.state.startTimeInput}
                            onChange={this.handleInput}/></td>
                        <td><Input 
                            name="finishTimeInput"
                            value={this.state.finishTimeInput}
                            onChange={this.handleInput}
                        /></td>
                        <td><Input 
                            name="breakInput"
                            value={this.state.breakInput}
                            onChange={this.handleInput}
                        /></td>

                        <td colSpan="2"><Button variant="info" width="125px">Create shift</Button></td>
                    </tr>
                </tbody>

                </Table>

            </Col>
            <br />
        </Container>
         );
    }
}
 
export default ShiftPage;

// const ShiftPage = props => {
//     const shifts = props.shifts;
//     return(
//         <Container>
//             <Col>
//             <AdnatHeader />
//             </Col>
//             <br />
//             <Col>
//             <p>Logged in as {props.currentUser}.</p>
//             <LogOutButton onClickLogout={props.onClickLogout}/>
//             </Col>
//             <br />
//             <Col>
//                 <h1>{props.org || 'Bob\'s Burgers'}</h1>
//                 <h3>Shifts</h3>
//                 <Table striped border="true" hover>
//             <thead>
//                 <tr>
//                     <th>Employee name</th>
//                     <th>Shift date</th>
//                     <th>Start time</th>
//                     <th>Finish time</th>
//                     <th>Break length (minutes)</th>
//                     <th>Hours worked</th>
//                     <th>Shift cost</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                     </tr>
//                     <tr>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                     </tr><tr>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                         <td>temp</td>
//                     </tr><tr>
//                         <td>temp</td>
//                         <td><Input size="sm"/></td>
//                         <td><Input /></td>
//                         <td><Input /></td>
//                         <td><Input /></td>
//                         <td colSpan="2"><Button variant="info" width="125px">Create shift</Button></td>
//                     </tr>
//                 </tbody>

//                 </Table>

//             </Col>
//             <br />
//         </Container>
//    )
// }

// export default ShiftPage;