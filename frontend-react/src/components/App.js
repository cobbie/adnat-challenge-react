import React, { Component } from 'react';

import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup'
import JoinCreateOrg from '../pages/JoinCreateOrg/JoinCreateOrg'
import OrgActions from '../pages/OrgActions/OrgActions'
import ShiftPage from '../pages/ShiftPage/ShiftPage';
import EditOrg from '../pages/EditOrg/EditOrg'
import EditUser from '../pages/EditUser/EditUser'

const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPage: 'signUp',
            isLoadingData: false,
            allOrgs: [],
            passwordConfirmInput: '',
            currentUser: '',
            orgName: '',
            orgId: '',
            currentPassword: '',
            
            passwordInput: '',
            nameInput: '',
            emailInput: '',
            rateInput: '',
            sessionId: '',

            // shift page input
            shiftDateInput: '',
            startTimeInput: '',
            finishTimeInput: '',
            breakTimeInput: '',

         };
         this.editOrgId;
         this.instance = axios.create({
             baseURL: 'http://localhost:3000',
            });
        // this.allOrgs = [];
        // this.orgId = 1;
    }

    //for DEV
    componentDidMount = () => {
        this.attemptLogIn('a@m.ca', 'asdfgh');
        // this.instance.post('/auth/login', {
        //     "email": "asdfgh@gh.com",
        //     "password": "asdfgh"
        // })
        // .then(res => {
        //     console.log(`successfully logged in!\n${JSON.stringify(res, null, 2)}`);
        //     this.setState({
        //         sessionId: res.data.sessionId,
        //     });
        //     return res.data.sessionId
        // })
        // .then(res => {
        //     this.instance.get('/users/me', {
        //         headers: {
        //             'Authorization': res,
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     .then(res => {
        //         console.log('second res', res)
        //         this.loadOrgData();
        //         this.setState({
        //             currentUser: res.data.name,
        //             orgId: res.data.organisationId,
        //             isLoadingData: false
        //         })
        //         console.log("reached this point");
        //         return res.data.organisationId;
        //     }
        //     )
        //     .then(res => {
        //         // WHY AINT THIS WORKING
        //         console.log("ALLORGS: ", this.state.allOrgs)
        //         this.state.allOrgs.forEach(org => {
        //                 console.log("orggg", org);
        //                 if(org[1]===res){
        //                 this.setState({orgName: org[0]})
    
        //         // for(let i = 0; i < this.state.allOrgs.length; i++){
        //         //     if (this.state.allOrgs[i][1]===res){
        //         //         this.setState({orgName: this.state.allOrgs[i][0]})
        //         //     }
        //         }
        //     })
        //     })
        //     .catch(err => console.log('error in get /users/me', err));
        // })
        // .catch( err => {
        //     console.log("Error!\n " + err);
        //     alert('Error in logging in');
        // });
    //     // this.attemptLogIn("asdfgh@gh.com", "asdfgh");
    }
    componentDidUpdate = () => {
        console.table(this.state);
        console.log("allOrgs", this.state.allOrgs);
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
    }

    handleInput = event => {
        this.setState({[event.target.name]: event.target.value});
    }

    loadOrgData = () => {
    this.instance.get('/organisations', {
        headers: {
            "Authorization": this.state.sessionId,
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        console.log("ORG DATA LOADED", JSON.stringify(res, null, 2));
        let new_orgs = [...this.state.allOrgs];
        for(let i = 0; i < res.data.length-1; i++){
            new_orgs = [...new_orgs, [res.data[i].name, res.data[i].id]];
        }
        this.setState({
            isLoadingData: false,
            allOrgs: new_orgs
        })
        return res;
    })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                console.log(error.request);
                } else {
                console.log('Error', error.message);
                }
                console.log(error.config);
        })

        // console.log(this.instance.get('/shifts', {headers: {'Authorization': this.state.sessionId, 'Content-Type': 'application/json'}}).then(res => console.log(res)).catch(err => console.log(err)));
        // console.log(this.instance.get('/users', {headers: {'Authorization': this.state.sessionId, 'Content-Type': 'application/json'}}).then(res => console.log('org users', res)).catch(err=>console.log('err in get org users', err)));

    }



    attemptLogIn = (email=this.state.emailInput, password=this.state.passwordInput) => {
    this.instance.post('/auth/login', {
        "email": email,
        "password": password
    })
    .then(res => {
        console.log("successfully logged in!\n" + JSON.stringify(res, null, 2));
        this.setState({
            currentPage: 'joinCreateOrg',
            nameInput: '',
            emailInput: '',
            passwordInput: '',
            passwordConfirmInput: '',
            currentPassword: password,
            sessionId: res.data.sessionId,
            isLoadingData: true,
        });
        return res.data.sessionId;
    })
    .then(res_seshId => {
        this.instance.get('/users/me', {
            headers: {
                'Authorization': res_seshId,
                'Content-Type': 'application/json'
            }
        })
        .then(res_user => {
            console.log('second res', res_user)
            this.loadOrgData();
            console.log('res_seshId', res_seshId)
            console.log('res_user.data.organisationId',res_user.data.organisationId);
            if(res_user.data.organisationId === null){
                this.setState({currentPage: 'joinCreateOrg'})                
            } else{
                this.instance.get('/organisations', {
                    headers:{
                        'Authorization': res_seshId,
                        'Content-Type': 'application/json'
                }})
                .then(res_orgs => {
                    console.log("res_orgs", res_orgs);
                    res_orgs.data.forEach(org => {
                        if(org.id===res_user.data.organisationId){
                            console.log('org.name', org.name)
                            this.setState({
                                currentPage: 'orgActions',
                                orgId: res_user.data.organisationId,
                                orgName: org.name,
                                isLoadingData: false
                            })
                            return org.name;
                        }
                    })
                })
            }
            this.setState({currentUser: res_user.data.name})
        }
        )
        .catch(err => console.log('error in get /users/me', err));
    })
    .catch( err => {
        console.log("Error!\n " + err);
        alert('Error in logging in');
    });
    }

    attemptLogOut = () => {
        this.instance.delete('/auth/logout', {
            headers: {
            'Authorization': this.state.sessionId, 
            'Content-Type': 'application/json'
                }})
        .then(res => this.setState({currentPage: 'logIn', currentUser: ''}))
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                console.log(error.request);
                } else {
                console.log('Error', error.message);
                }
                console.log(error.config);
        });
        // console.log(this.state.sessionId);
    }

    attemptUpdate = () => {
        this.instance.post('/organisations/create_join', {
        'name': this.state.nameInput,
        'hourlyRate': this.state.rateInput
    }, {
        headers: {
            'Authorization': this.state.sessionId, 
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        console.log(res);
        alert(`Successfully created ${this.state.nameInput}.`);
        const newPage = ''.equals(this.state.orgId) ? 'joinCreateOrg' : 'orgActions'
        this.setState({
            currentPage: 'orgActions'
        })
    })
    .catch(error => {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            } else if (error.request) {
            console.log(error.request);
            } else {
            console.log('Error', error.message);
            }
            console.log(error.config);
    })
    }

    joinOrg = id => {
        console.log('clicked');
        this.instance.post('/organisations/join', {
            organisationId: id
        }, {
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            this.setState({
                currentPage: 'orgActions',
                orgName: res.data.name,
                orgId: res.data.id
            })
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                console.log(error.request);
                } else {
                console.log('Error', error.message);
                }
                console.log(error.config);
        });
    }

    goToEditPage = id => {
        this.setState({
            currentPage: 'editOrg',
        });
        this.editOrgId = id;

    }

    editExistingOrg = () => {
        this.instance.put(`/organisations/${this.editOrgId}`, {
            'name': this.state.nameInput,
            'hourlyRate': this.state.rateInput
        }, {
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            alert(`Successfully updated organisation!`);
            this.setState({
                    currentPage: 'orgActions',
                    nameInput: '',
                    rateInput: ''
                })
            }
        )
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else if (error.request) {
                console.log(error.request);
                } else {
                console.log('Error', error.message);
                }
                console.log(error.config);
        });
    }

    leaveOrg = () => {
        console.log('clicked');
        this.instance.post('/organisations/leave', {}, {
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            alert('You have left your organisation.');
            this.setState({
                currentPage: 'joinCreateOrg',
                orgId: '',
                orgName: ''
            })
        })
        .catch(err => console.log(err));
    }

    editUserDetails = (obj_input) => {
        if(obj_input !== null){
            console.log('obj_input in main', obj_input);

            if(obj_input.name || obj_input.email){
            this.instance.put('/users/me', {
                "name": obj_input.name,
                "email": obj_input.email
            }, {
                headers: {
                    "Authorization": this.state.sessionId,
                    "Conent-Type": "application/json"
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    currentPage: 'orgActions',
                    currentUser: res.data.name ? res.data.name : this.state.currentUser,
                })
            })
            .catch(err => console.log(err))
        }
        if(obj_input.password){
            this.instance.post('users/me/change_password', {
                "oldPassword": obj_input.oldPassword,
                "newPassword": obj_input.password,
                "newPasswordConfirmation": obj_input.passwordConfirmation
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        }
    }


    renderPage = () => {
        if(this.state.currentPage==='signUp'){

            return(
                <Signup 
                onClick={this.attemptSignUp}
                onClickLogin={() => this.setState({currentPage: 'logIn'})}
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
                onClick={() => this.attemptLogIn()}

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
            return(
                <JoinCreateOrg 
                currentUser={this.state.currentUser}
                nameValue={this.state.nameInput}
                nameName={"nameInput"}
                nameOnChange={this.handleInput}


                rateValue={this.state.rateInput}
                rateName={"rateInput"}
                rateOnChange={this.handleInput}

                onClick={this.attemptUpdate}

                orgs={this.state.allOrgs} 
                onClickJoin={this.joinOrg}
                onClickEdit = {this.goToEditPage}
                onClickLogout = {this.attemptLogOut}
                />
                )
        }
    } else if(this.state.currentPage==='orgActions'){
        return(
            <OrgActions 
                currentUser={this.state.currentUser}
                org={this.state.orgName}
                onClickVS={() => {
                    this.setState({isLoadingData: true});
                    this.loadOrgData();
                    this.setState({currentPage: 'shiftPage'})
                    }}
                onClickEditOrg={() => {this.setState({currentPage: 'editOrg'})}}
                onClickEditUser={() => {this.setState({currentPage: 'editUser'})}}
                onClickLeave={this.leaveOrg}
                onClickLogout = {this.attemptLogOut}

            />
        )
    } else if(this.state.currentPage==='shiftPage'){
        return(
            <ShiftPage 
                org={this.state.orgName}
                currentUser={this.state.currentUser}
                onClickLogout = {this.attemptLogOut}
                
            />
        )
    } else if(this.state.currentPage==='editOrg'){
        return(
            <EditOrg 
            nameValue={this.state.nameInput}
            nameName={"nameInput"}
            nameOnChange={this.handleInput}

            rateValue={this.state.rateInput}
            rateName={"rateInput"}
            rateOnChange={this.handleInput}

            currentUser = {this.state.currentUser}
            onClickUpdate={this.editExistingOrg} 
            // onClickDelete
            onClickLogout = {this.attemptLogOut}

            />
        )
    } else if(this.state.currentPage==='editUser'){
        return(
            <EditUser 
                currentUser={this.state.currentUser}
                onClickLogout={this.attemptLogOut}
                onClickSubmit={this.editUserDetails}
                oldPassword={this.state.currentPassword}
            />
        )
    }
}



    render() { 
        console.log('this.props.children', this.props.children);
        const { isLoadingData } = this.state;

        if(isLoadingData){
            return <h5>LOADING DATA</h5>
        }
        return ( 
            <div>
                {this.renderPage()}
            </div>
         );
    }
}
 
export default App;