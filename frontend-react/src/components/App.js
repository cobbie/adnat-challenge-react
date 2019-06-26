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
            nameInput: '',
            emailInput: '',
            passwordInput: '',
            passwordConfirmInput: '',
            sessionId: ''
         };
         this.instance = axios.create({
             baseURL: 'http://localhost:3000',
            });
        this.counter = 0;
    }

    componentDidUpdate(){
        this.counter += 1;
        console.table(this.state);
    }

      attemptSignUp = () => {
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
        this.instance.post('/auth/login', {
            "email": this.state.emailInput,
            "password": this.state.passwordInput
        })
        .then(res => {
            console.log("successfully logged in!\n" + JSON.stringify(res, null, 2));
            this.setState({
                currentPage: 'joinCreateOrg',
                nameInput: '',
                emailInput: '',
                passwordInput: '',
                passwordConfirmInput: '',
                sessionId: res.data.sessionId
            });
        })
        .catch( err => {
            console.log("Error!\n " + err);
            alert('Error in logging in');
        });


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
        } else if(this.state.currentPage==='joinCreateOrg'){
            if(this.state.sessionId.length!=0){

                // this.instance = axios.create({
                //     baseURL: 'http://localhost:3000',
                //     headers: {
                //        "Authorization": this.state.sessionId,
                //        "Content-Type": "application/json"
                //     }
                //    });

                
                // ERROR HANDLING
                // this.instance.get('/organisations')
                // .catch(function (error) {
                //     if (error.response) {
                //     // The request was made and the server responded with a status code
                //     // that falls out of the range of 2xx
                //     console.log(error.response.data);
                //     console.log(error.response.status);
                //     console.log(error.response.headers);
                //     } else if (error.request) {
                //     // The request was made but no response was received
                //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                //     // http.ClientRequest in node.js
                //     console.log(error.request);
                //     } else {
                //     // Something happened in setting up the request that triggered an Error
                //     console.log('Error', error.message);
                //     }
                //     console.log(error.config);
                // });

                // console.log(this.state.sessionId);
                const options = path => {
                    return(
                        {
                            path: {path},
                            headers: {
                                "Authorization": this.state.sessionId,
                                "Content-Type": "application/json"
                            }, 
                        }
                        )
                        
                    }
                // this.instance.get(options('/organisations'))
                // .then(res => JSON.stringify(res, null, 2))
                // .catch(err => console.log("error in get \n", JSON.stringify(err, null, 2), this.state.sessionId))
                
                    // testing
                

                    
                this.instance.post('/organisations/create_join', {
                    'name': 'temp temp arya',
                    'hourlyRate': 5900
                }, {
                    headers: {
                        'Authorization': this.state.sessionId, 'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);
                        } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        }
                        console.log(error.config);
                })

                //using .request

                // this.instance.request({
                //     url: '/organisations/create_join',
                //     method: 'post',
                //     headers: {
                //         "Authorization": this.state.sessionId,
                //         "Content-Type": "application/json"
                //     },
                //     data: {
                //         "name": "temp temp orgscz",
                //         "hourlyRate": 59000
                //     }
                // })
            return(
                <JoinCreateOrg 
                currentUser='temp'
            />
        )
        }
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