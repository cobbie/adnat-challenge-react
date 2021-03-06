import React, { Component } from 'react';

import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup'
import JoinCreateOrg from '../pages/JoinCreateOrg/JoinCreateOrg'
import OrgActions from '../pages/OrgActions/OrgActions'
import ShiftPage from '../pages/ShiftPage/ShiftPage';
import EditOrg from '../pages/EditOrg/EditOrg'
import EditUser from '../pages/EditUser/EditUser'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import moment from 'moment';
import axios from 'axios'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPage: 'signUp',
            isLoadingData: false,
            allOrgs: [],
            currentUser: '',
            currentUserId: '',
            orgName: '',
            orgId: '',
            orgRate: '',
            currentPassword: '',
            currentEmail: '',
            currentShiftUserId: '',
            shifts: [],
            
            passwordConfirmInput: '',
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
         this.orgUsers;
         this.instance = axios.create({
             baseURL: 'http://localhost:3000',
            });
    }
    componentDidMount = () => {

    }
    componentDidUpdate = () => {
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
            alert('Successfully signed up!');
            this.setState({
                currentPage: 'logIn',
                nameInput: '',
                emailInput: '',
                passwordInput: '',
                passwordConfirmInput: ''
            });
            })
            .catch( err => {
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
        let newOrgs = [...this.state.allOrgs];
        // for(let i = 0; i < res.data.length-1; i++){
            res.data.forEach(org => {
                newOrgs = [...newOrgs, [org.name, org.id]];
            })
        // }
        this.setState({
            isLoadingData: false,
            allOrgs: newOrgs
        })
        return res;
    })
        .catch(error => console.log(error))
    }



    attemptLogIn = (email=this.state.emailInput, password=this.state.passwordInput) => {
    this.instance.post('/auth/login', {
        "email": email,
        "password": password
    })
    .then(res => {
        this.setState({
            currentPage: 'joinCreateOrg',
            nameInput: '',
            emailInput: '',
            passwordInput: '',
            passwordConfirmInput: '',
            currentEmail: this.state.emailInput,
            currentPassword: password,
            sessionId: res.data.sessionId,
            isLoadingData: true,
        });
        return res.data.sessionId;
    })
    .then(resSeshId => {
        this.instance.get('/users/me', {
            headers: {
                'Authorization': resSeshId,
                'Content-Type': 'application/json'
            }
        })
        .then(resUser => {
            this.loadOrgData();
            if(resUser.data.organisationId === null){
                this.setState({currentPage: 'joinCreateOrg'})                
            } else{
                this.instance.get('/organisations', {
                    headers:{
                        'Authorization': resSeshId,
                        'Content-Type': 'application/json'
                }})
                .then(resOrgs => {
                    resOrgs.data.forEach(org => {
                        if(org.id===resUser.data.organisationId){
                            this.setState({
                                currentPage: 'orgActions',
                                orgId: resUser.data.organisationId,
                                orgName: org.name,
                                orgRate: org.hourlyRate,
                                isLoadingData: false
                            })
                            return org.name;
                        }
                    })
                })
                .catch(err => console.log(err))
            }
            this.setState({
                currentUser: resUser.data.name,
                currentUserId: resUser.data.id})
        }
        )
        .catch(err => console.log('error in get /users/me', err));
    })
    .catch( err => {
        alert('Error in logging in');
    });
    }

    //clearer catch log
    // if (error.response) {
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //     } else if (error.request) {
    //     console.log(error.request);
    //     } else {
    //     console.log('Error', error.message);
    //     }
    //     console.log(error.config);

    attemptLogOut = () => {
        this.instance.delete('/auth/logout', {
            headers: {
            'Authorization': this.state.sessionId, 
            'Content-Type': 'application/json'
                }})
        .then(res => this.setState({
            currentPage: 'logIn', 
            currentUser: '',
            currentUserId: '',
            orgId: '',
            orgName: '',
            orgRate: '',
            allOrgs: [],
            }))
        .catch(error => {console.log(error)});
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
        alert(`Successfully created ${this.state.nameInput}.`);
        this.setState({
            nameInput: '',
            rateInput: '',
            currentPage: 'orgActions',
            orgName: res.data.name,
            orgId: res.data.id,
            orgRate: res.data.hourlyRate
        });
    })
    .catch(error => console.log(error))
    }

    joinOrg = id => {
        this.instance.post('/organisations/join', {
            organisationId: id
        }, {
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            this.setState({
                currentPage: 'orgActions',
                orgName: res.data.name,
                orgId: res.data.id,
                orgRate: res.data.hourlyRate
            })
        })
        .catch(error => console.log(error));
    }

    goToEditPage = id => {
        this.setState({
            currentPage: 'editOrg',
            orgId: id
        });

    }

    goToOrgActionsPage = () => {
        this.setState({
            currentPage: 'orgActions',

            //empty input
            passwordInput: '',
            nameInput: '',
            emailInput: '',
            rateInput: '',
            shiftDateInput: '',
            startTimeInput: '',
            finishTimeInput: '',
            breakTimeInput: ''

        })
    }

    getOrgUsers = () => {
        this.instance.get('/users', {headers:{
            'Authorization': this.state.sessionId,
            'Content-Type': 'application/json'
        }})
        .then(res => {
            this.orgUsers = res;
            return res;
        })
        .catch(err => err)
    }

    editExistingOrg = (id) => {
        if(!this.state.nameInput && !this.state.rateInput){
            return alert('Please input your changes');
        }
        this.instance.put(`/organisations/${id}`, {
            'name': this.state.nameInput ? this.state.nameInput : this.state.orgName,
            'hourlyRate': this.state.rateInput
        }, {
            headers: {
                'Authorization': this.state.sessionId,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            alert(`Successfully updated organisation!`);
            this.setState({
                    currentPage: 'orgActions',
                    orgName: this.state.nameInput ? this.state.nameInput : this.state.orgName,
                    orgRate: this.state.rateInput ? this.state.rateInput : this.state.orgRate,
                    nameInput: '',
                    rateInput: ''
                })
            }
        )
        .catch(error => {console.log(error)});
    }

    leaveOrg = () => {
        this.instance.get('/shifts', {headers:{
            'Authorization': this.state.sessionId,
            'Content-Type': 'application/json'
        }})
        .then(shifts => {
            let idArr=[];
            shifts.data.forEach(shift => {
                if(shift.userId===this.state.currentUserId)
                {
                    idArr = [...idArr, shift.id]
                }
            })

            idArr.forEach(id => {
                this.instance.delete(`/shifts/${id}`, {
                    headers:{
                    'Authorization': this.state.sessionId,
                    'Content-Type': 'application/json'
                }})
                .then(res => console.log('deleted', res))
                .catch(error => console.log(error));
            })
        })
        .then(res => {
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
                    orgName: '',
                    orgRate: ''
                })
            })
            .catch(err => console.log(err));
        })
        .catch(error => console.log(error))
    }

    editUserDetails = (obj_input) => {
        if(obj_input !== null){
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
                this.setState({
                    currentPage: 'orgActions',
                    currentUser: res.data.name ? res.data.name : this.state.currentUser,
                })
            })
            .catch(err => console.log(err))
        }
        if(obj_input.password){
            this.instance.put('/users/me/change_password', {
                "oldPassword": obj_input.oldPassword,
                "newPassword": obj_input.password,
                "newPasswordConfirmation": obj_input.passwordConfirmation
            }, {
                headers: {
                    "Authorization": this.state.sessionId,
                    "Content-Type": "application/json"
                }
            })
            .then(res => this.setState({currentPassword: obj_input.password, currentPage: 'orgActions'}))
            .catch(err => console.log(err))
        }
        }
    }

    getShifts = () => {

    }

    openShiftPage = () => {
        this.getOrgUsers();
        this.instance.get('/shifts', {
            headers:{
            'Authorization': this.state.sessionId,
            'Content-Type': 'application/json'
        }})
        .then(shiftsArr =>{
            this.setState({
                currentPage: 'shiftPage', 
                shifts: shiftsArr
            }, () => this.renderShifts(this.state.shifts));
        })
        .catch(error => console.log(error));
    }

    createShift = (newShift) => {
        
        this.instance.post('/shifts', newShift, {
            headers: {
                "Authorization": this.state.sessionId,
                "Content-Type": "application/json"
            }
        })
        .then(shift => {
            this.setState({currentShiftUserId: newShift.userId,
                            // shifts: [...this.state.shifts, shift.data]
                        }, () => this.openShiftPage());
        })
        .catch(error => console.log(error));
    }


    // LIFTING STATE UP FROM SHIFTPAGE //

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

    renderShiftRows = () => {
        if(this.state.shifts.data) return null
        // sort shifts
        const sortedDates = _.orderBy(this.state.shifts, o => {
          return moment(`${o.date} ${o.startTime}`, "MM/DD/YYYY h:mm A")
        }, ['asc']);

        console.log('sortedDates', sortedDates)
          // Uses shiftArr state
        const shifts = sortedDates.map((shift,ind)=> {
            return(
            <tr key={ind}>
              <td>{shift.employeeName}</td>
              <td>{shift.date}</td>
              <td>{shift.startTime}</td>
              <td>{shift.endTime}</td>
              <td>{shift.breakLength}</td>
              <td>{shift.hoursWorked}</td>
              <td>{shift.cost}</td>
            </tr>)
      })
      return shifts;
    }

    renderShifts = shifts => {
        console.log('shifts from renderShifts', shifts);
        if (shifts.data.length < 1) return "no shifts";
        let shiftRows = [];
        let counter = 1;
        shifts.data.forEach(shift => {
          //parse for date, start, end
          const date = _.split(_.split(shift.start, " ")[0], "-")
            .reverse()
            .join("/");
          let startTime = _.split(shift.start, " ")[1];
          let endTime = _.split(shift.finish, " ")[1];
    
          //calculate hours and costs
          const hoursWorked = this.calculateHours(
            shift.start,
            shift.finish,
            shift.breakLength
          );
          const cost = (hoursWorked * parseFloat(this.state.orgRate)).toFixed(2);
    
          //add am pm with moment
          startTime = moment(startTime, "HH:mm A").format("h:mm A");
          endTime = moment(endTime, "HH:mm A").format("h:mm A");
          let employeeName = "";
    
          if (this.orgUsers.data.length > 0) {
            this.orgUsers.data.forEach(user => {
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
          this.setState({
              shifts: shiftRows
            }, console.log('this.setstate shifts', this.state));
        });
      };

    renderPage = () => {
        if(this.state.currentPage==='signUp'){

            return(
                <Signup 
                onClick={this.attemptSignUp}
                onClickLogin={() => this.setState({
                    currentPage: 'logIn',
                    passwordConfirmInput: '',
                    passwordInput: '',
                    nameInput: '',
                    emailInput: '',
                    })}
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
                onClickSignup={() => this.setState({
                    currentPage: 'signUp',
                    emailInput: '',
                    passwordInput: ''
                    })}

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

                onClickHeader={this.goToOrgActionsPage}
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
                    // this.setState({isLoadingData: true});
                    // this.loadOrgData();
                    // this.setState({currentPage: 'shiftPage'})
                    this.openShiftPage();
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
                    currentUserEmail={this.state.currentEmail}
                    onClickLogout = {this.attemptLogOut}
                    onClickHeader={this.goToOrgActionsPage}
                    hourlyRate={this.state.orgRate}
                    orgUsers={this.orgUsers}
                    shifts = {this.state.shifts}
                    onClickCreateShift={this.createShift}
                    userId={this.state}
                    shiftRows={this.renderShiftRows()}
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
            onClickUpdate={() => this.editExistingOrg(this.state.orgId)} 
            onClickHeader={this.goToOrgActionsPage}
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
                onClickHeader={this.goToOrgActionsPage}
            />
        )
    }
}   

    render() { 
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