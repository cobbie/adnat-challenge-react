import React, { Component } from 'react';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import TextButton from '../../components/TextButton/TextButton'

import './style.css'

const Login = props => {
    return(
        <div className = "main">
            <div className="flexbox-main">
                <TextButton fontSize="20px">Adnat</TextButton>
                <h2>Log in</h2>
                    <Input title="Email" name={props.emailName} value={props.emailValue} onChange={props.emailOnChange}/>
                    <Input title="Password" name={props.passwordName} value={props.passwordValue} onChange={props.passwordOnChange}/>
                    <Button height="30px"/>
                <p>Remember me</p>
                <TextButton onClick={props.onClick}>Login</TextButton>
                <TextButton>Forgot your password?</TextButton>
            </div>
            </div>
    )
}

export default Login;