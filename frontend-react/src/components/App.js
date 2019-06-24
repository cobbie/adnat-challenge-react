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
            currentPage: 'logIn',
            testData: [],
            nameInput: '',
            emailInput: '',
            passwordInput: '',
            passwordConfirmInput: ''
         };
         this.instance = axios.create({baseURL: 'http://localhost:3000'});
    }

    componentDidMount = () => {

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
        // console.log(JSON.stringify(this.state, null, 2));
        let matchingPW = (this.state.passwordInput === this.state.passwordConfirmInput);
        let pwLength = (this.state.passwordInput.length >= 6)
        let nonEmptyInput = (this.state.nameInput.length != 0 && this.state.emailInput.length != 0 && this.state.passwordInput.length != 0);
        if(matchingPW && pwLength && nonEmptyInput){
            return this.instance.post('/auth/signup', {
                        "name": this.state.nameInput,
                        "email": this.state.emailInput,
                        "password": this.state.passwordInput,
                        "passwordConfirmation": this.state.passwordConfirmInput
                  })
              .then(res => {
                console.log("successfully signed up!\n" + JSON.stringify(res, null, 2));
                this.setState({
                    currentPage: 'logIn',
                    nameInput: '',
                    emailInput: '',
                    passwordInput: '',
                    passwordConfirmInput: ''
                });
              })
              .catch( err => {
                console.log("Error!\n " + err);
                alert('Error in signing up');
              });
        } 
        alert('Error in input!');
        console.log(matchingPW, pwLength, nonEmptyInput);

      }

      attemptLogIn = () => {
        console.log(this.state);
        console.log('test');
      }

      renderPage = () => {
          if(this.state.currentPage==='signUp'){

              return(
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
          )
        } else if(this.state.currentPage==='logIn'){
            return(
                <Login 
                    onClick={this.attemptLogIn}

                    emailName={"emailInput"}
                    emailValue={this.state.emailInput}
                    emailOnChange={this.handleInput}

                    passwordValue={this.state.passwordInput}
                    passwordName={"passwordInput"}
                    passwordOnChange={this.handleInput}
                    
                />
            )
        }
      }

      handleInput = event => {
          this.setState({[event.target.name]: event.target.value});
      }

    render() { 
        return ( 
            <div>
                {this.renderPage()}
            </div>
         );
    }
}
 
export default App;