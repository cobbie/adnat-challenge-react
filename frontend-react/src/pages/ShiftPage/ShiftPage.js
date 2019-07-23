import React, { Component } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";

import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import LogOutButton from "../../components/LogOutButton/LogOutButton";

import "./style.css";
import _ from 'lodash';
import moment from 'moment';

class ShiftPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shiftDateInput: "",
      startTimeInput: "",
      finishTimeInput: "",
      breakInput: "",
      shiftsArr: []
    };
    this.name = this.props.currentUser;
    this.id = this.props.shifts.data.length + 1;
  }

  componentDidUpdate = () => {
    console.log('this.state', this.state);
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
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
    this.props.orgUsers.data.forEach(user => {
      if (user.email === this.props.currentUserEmail) {
        userId = user.id;
      }
    });

    const shiftObj = {
      userId: userId,
      start: startTime,
      finish: endTime,
      breakLength: this.state.breakInput
    };
    this.setState({
      shiftDateInput: "",
      startTimeInput: "",
      finishTimeInput: "",
      breakInput: "",
      // shiftsArr: [...this.state.shiftsArr, shiftObj]
    });
    console.log('shiftObj', shiftObj)
    return shiftObj;
  };

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
                {/* {this.renderShiftRows()} */}
                {this.props.shiftRows}
              <tr>
                <td><div className="customPad">{this.name}</div></td>
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

                <td colSpan="2" className="buttonCell">

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
