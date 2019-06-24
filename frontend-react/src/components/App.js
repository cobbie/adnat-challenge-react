import React, { Component } from 'react';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup'
import JoinCreateOrg from '../pages/JoinCreateOrg/JoinCreateOrg'
import OrgActions from '../pages/OrgActions/OrgActions'
import ShiftPage from '../pages/ShiftPage/ShiftPage';
const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPage: 'signUp',
            testData: [],
            nameInput: '',
            emailInput: '',
            passwordInput: '',
            passwordConfirmInput: ''
         };
        //  this.attemptSignUp = this.attemptSignUp.bind(this);
         this.handleInput = this.handleInput.bind(this);
         this.instance = axios.create({baseURL: 'http://localhost:3000'});
    }

    componentDidMount() {

        // const instance = axios.create({baseURL: 'http://localhost:3000'})

        // instance.get('/organisations', {
        //     headers: {
        //         "Authorization": "c57270c4-f58b-40b8-b180-8a6ecf5ff307",
        //         "Conent-Type": "application/json"
        // }
        // })
        // .then((response) => {response.json(response)})
        // .catch((error) => {response.json(error)})

        // instance.post('/auth/login', {
        //             // "name": "Barney stinson",
        //             "email": "barney@st2inson.com",
        //             "password": "mypassword",
        //             // "passwordConfirmation": "mypassword"
        //       })
        //   .then(function (res) {
        //     console.log("success!\n" + JSON.stringify(res));
        //   })
        //   .catch(function (err) {
        //     console.log("WOOPS! " + err);
        //   });
      }

      attemptSignUp = () => {
        // inputVar = event.target.value
        // console.log(this.state.nameInput);
        console.log(JSON.stringify(this.state, null, 2));
        this.instance.post('/auth/signup', {
                    "name": this.state.nameInput,
                    "email": this.state.emailInput,
                    "password": this.state.passwordInput,
                    "passwordConfirmation": this.state.passwordConfirmInput
              })
          .then(function (res) {
            console.log("successfully signed up!\n" + JSON.stringify(res, null, 2));
            this.setState({currentPage: 'logIn'});
          })
          .catch(function (err) {
            console.log("Error!\n " + err);
            alert('Error in signing up');
          });

      }

      handleInput(event){
          this.setState({[event.target.name]: event.target.value});
      }

    render() { 
        return ( 
            <div>
             <Signup 
                    onClick={this.attemptSignUp}

                    nameValue={this.state.nameInput}
                    nameName={"nameInput"}
                    nameOnChange={this.handleInput}
                    
                    emailValue={this.state.emailInput}
                    emailName={"emailInput"}
                    emailOnChange={this.handleInput}

                    passwordValue={this.state.passwordInput}
                    passwordName={"passwordInput"}
                    passwordOnChange={this.handleInput}

                    passwordConfirmValue={this.state.passwordConfirmValue}
                    passwordConfirmName={"passwordConfirmInput"}
                    passwordConfirmOnChange={this.handleInput}

            /> 
            </div>
         );
    }
}
 
export default App;