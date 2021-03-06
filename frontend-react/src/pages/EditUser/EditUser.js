import React, { Component } from 'react';
import { Col, Container, ListGroup, Row } from "react-bootstrap";

import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";
import LogOutButton from "../../components/LogOutButton/LogOutButton";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const _ = require('lodash');

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: false,
            email: false,
            password: false,

            newNameInput: '',
            newEmailInput: '',
            oldPasswordInput: '',
            newPasswordInput: '',
            newConfirmPasswordInput: ''
         }
    }

    verifyInput = () => {
        let input_obj = {};

        this.state.newNameInput !== '' ? _.merge(input_obj, {name:this.state.newNameInput}) : null;
        this.state.newEmailInput !== '' ? _.merge(input_obj, {email:this.state.newEmailInput}) : null;

        if(this.state.newPasswordInput !== ''){
            let matchingPws = true;

            this.state.oldPasswordInput === this.props.oldPassword ?
            _.merge(input_obj, {oldPassword:this.state.oldPasswordInput}) :
             matchingPws = false;

            this.state.newPasswordInput === this.state.newConfirmPasswordInput ?
             _.merge(input_obj, {password: this.state.newPasswordInput, passwordConfirmation: this.state.newConfirmPasswordInput}):
             matchingPws = false;

            this.state.newPasswordInput.length >= 6 ? matchingPws = matchingPws : matchingPws = false;

            this.state.newPasswordInput !== this.state.oldPasswordInput ? matchingPws = matchingPws : matchingPws = false;
            if(matchingPws === false){
                alert('Invalid password input. \nEither your new passwords are not 6 characters, they do not match, or your old password is incorrect.');
                return null;
            }
        }
        return input_obj;
    }

    renderInput = () => {
        let input = [];
        let counter = 1;
        if(this.state.name){
            input = [...input, 
                <li key ={counter}><Input
                title="Name"
                onChange={this.handleInput}
                value={this.state.newNameInput}
                name="newNameInput"
              />
              </li>]
              counter += 1;
        }
        if(this.state.email){
            input = [...input, <li key={counter}><Input
                title="Email"
                onChange={this.handleInput}
                value={this.state.newEmailInput}
                name="newEmailInput"
              />
              </li>]
              counter +=1;
        }
        if(this.state.password){
            input = [...input, 
            <li key={counter}>
                <Input title="Old Password"
                onChange={this.handleInput}
                value={this.state.oldPasswordInput}
                name="oldPasswordInput"
                type="password"
                >
                </Input>
            </li>]

            counter += 1;

            input = [...input, 
                <li key={counter}>
                <Input
                title="Password"
                onChange={this.handleInput}
                value={this.state.newPasswordInput}
                name="newPasswordInput"
                type="password"
            /></li>]
            counter +=1;
            input = [...input, <li key={counter}>
              <Input
            title="Confirm Password"
            onChange={this.handleInput}
            value={this.state.newConfirmPasswordInput}
            name="newConfirmPasswordInput"
            type="password"
          /></li>]
          counter += 1;
        }

        if(counter > 1){
            input = [...input, <li key={counter ? this.state.password : counter}>
                <Button onClick={() => this.props.onClickSubmit(this.verifyInput())}>Submit</Button>
            </li>]
        }
        return input;
    }

    handleInput = event => {
        this.setState({[event.target.name]: event.target.value});
    }
    
    render() { 
        console.table(this.state);
        return ( 
            <Container>
      <AdnatHeader 
          onClick={this.props.onClickHeader}
      />
      <p>Logged in as {this.props.currentUser}</p>
      <LogOutButton onClickLogout={this.props.onClickLogout} />

      <h1>Update your info</h1>
      <Button variant="link" width="140px" onClick={() => this.setState({name: !this.state.name})}>Edit Name</Button>
      <Button variant="link" width="140px" onClick={() => this.setState({email: !this.state.email})}>Edit Email</Button>
      <Button variant="link" width="140px" onClick={() => this.setState({
          password: !this.state.password,
          oldPasswordInput: '',
          newPasswordInput: '',
          newConfirmPasswordInput: ''
          })}>Edit Password</Button>
            <br></br>
        <ul style={{listStyleType: 'none'}}>
        {this.renderInput()}
        </ul>

    </Container>
         );
    }
}
 
export default EditUser;