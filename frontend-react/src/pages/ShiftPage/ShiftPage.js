import React, { Component } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";

import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import LogOutButton from "../../components/LogOutButton/LogOutButton";

import "./style.css";

const _ = require("lodash");
const moment = require("moment");

class ShiftPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shiftDateInput: "",
      startTimeInput: "",
      finishTimeInput: "",
      breakInput: "",

      //test
      shiftsArr: []
    };
    this.name = this.props.currentUser;
    this.id = this.props.shifts.data.length + 1;
  }

  componentDidUpdate = () => {
    console.log('this.state from shiftpage', this.state);
    console.log('this.props.shifts.data from CDU', this.props.shifts.data)

  };

  componentDidMount = () => {
    this.renderShifts(this.props.shifts.data);
    console.log("mounted");
    console.log('this.props.shifts.data from CDM', this.props.shifts.data);
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  calculateHours = (start, end, breakLength) => {
    const startMoment = moment(start, ["YYYY-DD-MM HH:mm"]);
    const endMoment = moment(end, ["YYYY-DD-MM HH:mm"]);
    const breakMoment = moment.duration(breakLength, "minutes");
    let duration = moment
      .duration(endMoment.diff(startMoment))
      .subtract(breakMoment);
    let hoursWorked = duration.asHours();
    return hoursWorked.toFixed(2);
  };

  createShiftObj = () => {
    //get current userId in org
    let userId = "";
    const date = _.split(this.state.shiftDateInput, "/")
      .reverse()
      .join("-");
    let startTime = moment(this.state.startTimeInput, ["h:mm A"]).format(
      "HH:mm"
    );
    let endTime = moment(this.state.finishTimeInput, ["h:mm A"]).format(
      "HH:mm"
    );

    startTime = `${date} ${startTime}`;
    endTime = `${date} ${endTime}`;
    console.log("this.props.currentUserEmail", this.props.currentUserEmail);
    console.log('this.props.orgUsers.data', this.props.orgUsers.data);
    this.props.orgUsers.data.forEach(user => {
      console.log("user.email", user.email);
      if (user.email === this.props.currentUserEmail) {
        console.log("userId:", user.id);
        userId = user.id;
      }
    });

    const shiftObj = {
      userId: userId,
      start: startTime,
      finish: endTime,
      breakLength: this.state.breakInput
    };
    console.log("shiftObj", shiftObj);
    this.setState({
      shiftDateInput: "",
      startTimeInput: "",
      finishTimeInput: "",
      breakInput: "",
      // shiftsArr: [...this.state.shiftsArr, shiftObj]
    });
    return shiftObj;
  };

  renderShifts = shifts => {
    // let shifts = [];
    if (shifts.length < 1) return "no shifts";
    let shiftRows = [];
    let counter = 1;
    console.log("shifts", shifts);
    shifts.forEach(shift => {
      //parse for date, start, end
      const date = _.split(_.split(shift.start, " ")[0], "-")
        .reverse()
        .join("/");
      let startTime = _.split(shift.start, " ")[1];
      let endTime = _.split(shift.finish, " ")[1];

      console.log("date, startTime, endTime", date, startTime, endTime);
      //calculate hours and costs
      const hoursWorked = this.calculateHours(
        shift.start,
        shift.finish,
        shift.breakLength
      );
      const cost = (hoursWorked * parseFloat(this.props.hourlyRate)).toFixed(2);

      console.log("hoursWorked, cost", hoursWorked, cost);
      //add am pm with moment
      // let startTime = moment(this.state.startTimeInput, ["h:mm A"]).format("HH:mm");
      startTime = moment(startTime, "HH:mm A").format("h:mm A");
      endTime = moment(endTime, "HH:mm A").format("h:mm A");
      let employeeName = "";

      if (this.props.orgUsers.data.length > 0) {
        this.props.orgUsers.data.forEach(user => {
          if (user.id === shift.userId) {
            employeeName = user.name;
          }
        });
      }

      shiftRows = [...shiftRows, 
        {
            employeeName: employeeName,
            date: date,
            startTime: startTime,
            endTime: endTime,
            breakLength: shift.breakLength,
            hoursWorked: hoursWorked,
            cost: cost
          }]
    console.log('shiftRows var', shiftRows);
      this.setState({
          shiftsArr: shiftRows
        }, console.log('this.setstate shiftrows', this.state));
    });
    // return shiftRows;
  };

  renderShiftRows = () => {

    const sortedDates = _.orderBy(this.state.shiftsArr, o => {
      return moment(`${o.date} ${o.startTime}`, "MM/DD/YYYY h:mm A")
    }, ['asc'])
    console.log('shiftsArr', this.state.shiftsArr);
    console.log('sortedDates', sortedDates);
      // Uses shiftArr state
      console.log('rendershiftrows', this.state.shiftsArr)
    const shifts = sortedDates.map((shift,ind)=> {
        return(
        <tr key={ind}>
          {/* name         */}
          <td>{shift.employeeName}</td>
          {/* shift date      */}
          <td>{shift.date}</td>
          {/* starttime          */}
          <td>{shift.startTime}</td>
          {/* end time          */}
          <td>{shift.endTime}</td>
          {/* break length(mins)         */}
          <td>{shift.breakLength}</td>
          {/* hours worked          */}
          <td>{shift.hoursWorked}</td>
          {/* shift cost             */}
          <td>{shift.cost}</td>
        </tr>)
  })
  return shifts;
}

  render() {
    return (
      <Container>
        <Col>
          <AdnatHeader onClick={this.props.onClickHeader} />
        </Col>
        <br />
        <Col>
          <p>Logged in as {this.props.currentUser}.</p>
        </Col>
        <Row>
          <Col>
            <LogOutButton onClickLogout={this.props.onClickLogout} />
          </Col>
        </Row>
        <br />
        <Col>
          <h1>{this.props.org || "Bob's Burgers"}</h1>
          <h3>Shifts</h3>
          <Table striped border="true" hover>
            <thead>
              <tr>
                <th>Employee name</th>
                <th>Shift date (MM/DD/YYYY)</th>
                <th>Start time (i.e. 9 am)</th>
                <th>Finish time (i.e. 5 pm)</th>
                <th>Break length (minutes)</th>
                <th>Hours worked</th>
                <th>Shift cost</th>
              </tr>
            </thead>
            <tbody key={this.props.shifts.data}>
              {/* {this.renderShifts(this.props.shifts.data)} */}
                {this.renderShiftRows()}
              <tr>
                <td>{this.name}</td>
                <td>
                  <Input
                    name="shiftDateInput"
                    value={this.state.shiftDateInput}
                    onChange={this.handleInput}
                  />
                </td>
                <td>
                  <Input
                    name="startTimeInput"
                    value={this.state.startTimeInput}
                    onChange={this.handleInput}
                  />
                </td>
                <td>
                  <Input
                    name="finishTimeInput"
                    value={this.state.finishTimeInput}
                    onChange={this.handleInput}
                  />
                </td>
                <td>
                  <Input
                    name="breakInput"
                    value={this.state.breakInput}
                    onChange={this.handleInput}
                  />
                </td>

                <td colSpan="2">
                  <Button
                    variant="info"
                    width="125px"
                    onClick={() => {
                      this.props.onClickCreateShift(this.createShiftObj());
                    }}
                  >
                    Create shift
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
