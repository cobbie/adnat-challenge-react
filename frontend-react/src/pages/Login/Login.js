import React, { Component } from 'react';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import TextButton from '../../components/TextButton/TextButton'

import './style.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className = "main">
            <div className="flexbox-main">
                <TextButton fontSize="20px">Adnat</TextButton>
                <h2>Log in</h2>
                    <Input title="Email"/>
                    <Input title="Password"/>
                    <Button height="30px"/>
                <p>Remember me</p>
                <TextButton>Login</TextButton>
                <TextButton>Forgot your password?</TextButton>
            </div>
            </div>
         );
    }
}

export default Login;