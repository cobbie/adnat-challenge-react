import React from "react";
import TextButton from "../../components/TextButton/TextButton";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

import './style.css'

const Signup = props => {

  return (
    <div>
      <TextButton fontSize="50px">Adnat</TextButton>
      <h1>Sign up</h1>
      <Input title="Name" value={props.nameValue} onChange={props.nameOnChange} name={props.nameName} defaultValue={"TEST NAME"}/>
      <Input title="Email" value={props.emailValue} onChange={props.emailOnChange} name={props.emailName} />
      <Input title="Password" value={props.passwordValue} onChange={props.passwordOnChange} name={props.passwordName} secondaryText="6 characters minimum"/>
      <Input title="Password confirmation" value={props.passwordConfirmValue} onChange={props.passwordConfirmOnChange} name={props.passwordConfirmName}/>
      <Button onClick={props.onClick}>Sign up</Button>
      <TextButton>Login</TextButton>
    </div>
  );
};

// defaultValue={()=>{
//   const tempName = "test Quintos";
//   const tempEmail = "@test.email.com"
//   const randomNum = Math.random().toString()
//   return tempName + randomNum + tempEmail;
  
// }}
export default Signup;
