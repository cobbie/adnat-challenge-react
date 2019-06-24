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
            currentPage: 'login',
            testData: []
         }
    }

    componentDidMount() {

        // fetch('/auth/signup', {
        //     method: 'POST',
        //     headers: {
        //         "Authorization": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         "name": "Barney Rubble",
        //         "email": "barney@gmail.com",
        //         "password": "mypassword",
        //         "passwordConfirmation": "mypassword"
        //     })
        //   }).then(console.log(res.json))
        //   .catch(console.log);

        const instance = axios.create({baseURL: 'http://localhost:3000'})

        // instance.get('/auth/signup', {port: 3000})
        // .then((response) => {res.json(response)})
        // .catch((error) => {res.json(error)})

        instance.post('/auth/signup', {
                    "name": "Barney stinson",
                    "email": "barney@stinson.com",
                    "password": "mypassword",
                    "passwordConfirmation": "mypassword"
              })
          .then(function (res) {
            console.log("success!\n" + JSON.stringify(res));
          })
          .catch(function (err) {
            console.log("WOOPS! " + err);
          });
      }

    render() { 
        console.log(this.state.testData);
        return ( 
            <div>
            <Login /> 
            </div>
         );
    }
}
 
export default App;