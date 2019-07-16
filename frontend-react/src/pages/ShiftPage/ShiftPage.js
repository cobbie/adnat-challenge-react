import React, { Component } from 'react';
import {Container, Table, Row, Col} from 'react-bootstrap';

import AdnatHeader from '../../components/AdnatHeader/AdnatHeader';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import LogOutButton from '../../components/LogOutButton/LogOutButton';

import './style.css'

const _ = require('lodash');
const moment = require('moment');

class ShiftPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            shiftDateInput: '',
            startTimeInput: '',
            finishTimeInput: '',
            breakInput: ''
         }
         this.name=this.props.currentUser;
         this.id=this.props.shifts.data.length + 1;
    }

    componentDidUpdate = () => {
        console.log(this.state);
    }
    componentDidMount = () => {
        console.log('this.props.hourlyRate', this.props.hourlyRate);
        console.log('Org Users', this.props.orgUsers);
    }

    handleInput = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    calculateHours = (start, end, breakLength) => {
        const startMoment = moment(start);
        const endMoment = moment(end);
        const breakMoment = moment.duration(breakLength, 'minutes');
        let duration = moment.duration(endMoment.diff(startMoment)).subtract(breakMoment);
        let hoursWorked = duration.asHours();

        return hoursWorked.toFixed(2);
    }

    createShiftObj = () => {
        //get current userId in org
        let userId = '';
        const date = _.split(this.state.shiftDateInput, '/').reverse().join('-');
        let startTime = moment(this.state.startTimeInput, ["h:mm A"]).format("HH:mm");
        let endTime = moment(this.state.finishTimeInput, ["h:mm A"]).format("HH:mm");

        startTime = `${date} ${startTime}`;
        endTime = `${date} ${endTime}`;
        console.log('this.props.currentUserEmail', this.props.currentUserEmail);
        this.props.orgUsers.data.forEach(user => {
            console.log('user.email', user.email)
            if(user.email === this.props.currentUserEmail) {
                console.log('userId:', user.id)
                userId = user.id;
        }})


        const shiftObj =  {
            userId: userId,
            start: startTime,
            finish: endTime,
            breakLength: this.state.breakInput
        }; 
        console.log('shiftObj', shiftObj);
        return shiftObj;
    }

    renderShifts = shifts => {
        // let shifts = [];
        let shift_rows = []
        let counter = 1;
        shifts.forEach(shift => {
            //parse for date, start, end
            const date = _.split(_.split(shift.start, ' ')[0], '-').reverse().join('/');
            let startTime = _.split(shift.start, ' ')[1];
            let endTime = _.split(shift.finish, ' ')[1];

            //calculate hours and costs
            const hoursWorked = this.calculateHours(shift.start, shift.finish, shift.breakLength);
            const cost = (hoursWorked * parseFloat(this.props.hourlyRate)).toFixed(2);
            // add am pm
            startTime.slice(0,2) < 12 ? startTime = `${startTime}am` : startTime = `${startTime}pm`;
            endTime.slice(0,2) < 12 ? endTime = `${endTime}am` : endTime = `${endTime}pm`;

           let employeeName = ''
           this.props.orgUsers.data.forEach(user => {
               if(user.id === shift.userId) {
                   employeeName = user.name;
           }})
            shift_rows = [...shift_rows, 
            <tr>
       {/* name         */}
        <td>{employeeName}</td>
       {/* shift date      */}
        <td>{date}</td>
       {/* starttime          */}
       <td>{startTime}</td>
        {/* end time          */}
        <td>{endTime}</td>
       {/* break length(mins)         */}
       <td>{shift.breakLength}</td>
       {/* hours worked          */}
       <td>{hoursWorked}</td>
       {/* shift cost             */}
       <td>{cost}</td>
            </tr>
            ]
            counter += 1;
        })
        return shift_rows;
    }

    render() { 
        return ( 
            <Container>
            <Col>
            <AdnatHeader
                onClick={this.props.onClickHeader} />
            </Col>
            <br />
            <Col>
            <p>Logged in as {this.props.currentUser}.</p>
            </Col>
            <Row>
                <Col>
                <LogOutButton onClickLogout={this.props.onClickLogout}/>
                </Col>
            </Row>
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
                {this.renderShifts(this.props.shifts.data)}
                    <tr>
                        <td>{this.name}</td>
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

                        <td colSpan="2"><Button 
                        variant="info" 
                        width="125px"
                        onClick={
                            () => {this.props.onClickCreateShift(
                                // _.assign({'userId': this.id}, {
                                //     "start": `${_.split(this.state.shiftDateInput, '/', 3).reverse().join('/')} ${this.state.startTimeInput}`,
                                //     "finish": `${_.split(this.state.shiftDateInput, '/', 3).reverse().join('/')} ${this.state.startTimeInput}`,
                                //     "breakLength": this.state.breakInput
                                // })
                                this.createShiftObj()
                                )}}
                        >Create shift

                        </Button>
                                </td>
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