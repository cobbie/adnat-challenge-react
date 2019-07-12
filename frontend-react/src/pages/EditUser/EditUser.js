import React, { Component } from 'react';
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import AdnatHeader from "../../components/AdnatHeader/AdnatHeader";
import LogOutButton from "../../components/LogOutButton/LogOutButton";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: false,
            email: false,
            password: false,

            newNameInput: '',
            newEmailInput: '',
            newPasswordInput: ''
         }
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
                // value={props.nameValue}
                // onChange={props.nameOnChange}
                // name={props.nameName}
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
                // value={props.nameValue}
                // onChange={props.nameOnChange}
                // name={props.nameName}
              />
              </li>]
              counter +=1;
        }
        if(this.state.password){
            input = [...input, 
                <li key={counter}>
                <Input
                title="Password"
                onChange={this.handleInput}
                value={this.state.newPasswordInput}
                name="newPasswordInput"
                // value={props.nameValue}
                // onChange={props.nameOnChange}
                // name={props.nameName}
              /></li>,<li key={counter + 1}>
              <Input
            title="Confirm Password"
            onChange={this.handleInput}
            value={this.state.newConfirmPasswordInput}
            name="newConfirmPasswordInput"
            // value={props.nameValue}
            // onChange={props.nameOnChange}
            // name={props.nameName}
          /></li>]
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
      <AdnatHeader />
      <p>Logged in as {this.props.currentUser}</p>
      <LogOutButton onClickLogout={this.props.onClickLogout} />

      <h1>Update your info</h1>
      <Button variant="link" width="140px" onClick={() => this.setState({name: true})}>Edit Name</Button>
      <Button variant="link" width="140px" onClick={() => this.setState({email: true})}>Edit Email</Button>
      <Button variant="link" width="140px" onClick={() => this.setState({password: true})}>Edit Password</Button>
            <br></br>
        <ul style={{listStyleType: 'none'}}>
        {this.renderInput()}
        </ul>
    </Container>
         );
    }
}
 
export default EditUser;
// const EditUser = props => {
//   return (
//     <Container>
//       <AdnatHeader />
//       <p>Logged in as {props.currentUser}</p>
//       <LogOutButton onClickLogout={props.onClickLogout} />

//       <h1>Update your info</h1>
//       <Button variant="link" width="140px" onClick={renderNameInput}>Edit Name</Button>
//       <Button variant="link" width="140px" onClick={props.onClickEmail}>Edit Email</Button>
//       <Button variant="link" width="140px" onClick={props.onClickPassword}>Edit Password</Button>
      

//       <Input
//         title="Email Address"
//         value={props.nameValue}
//         onChange={props.nameOnChange}
//         name={props.nameName}
//       />

//       <Input
//         title="Password"
//         value={props.nameValue}
//         onChange={props.nameOnChange}
//         name={props.nameName}
//       />

//       <Input title="ConfirmPassword" 
//           value={props.nameValue}
//           onChange={props.nameOnChange}
//           name={props.nameName}/>
//     </Container>
//   );
// };

// export default EditUser;
