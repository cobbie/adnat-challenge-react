import React, { Component } from 'react';
import { Container, Col, ToggleButton } from 'react-bootstrap';

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import TextButton from '../../components/TextButton/TextButton'
import AdnatHeader from '../../components/AdnatHeader/AdnatHeader'

import './style.css'

const Login = props => {
    return(
        <Container>
            <Col md="auto">
                <AdnatHeader />
            </Col>
            <Col>
                <h2>Log in</h2>
            </Col>
            <Col>
                    <Input title="Email" name={props.emailName} value={props.emailValue} onChange={props.emailOnChange}/>
            </Col>
            <Col>
                    <Input title="Password" name={props.passwordName} value={props.passwordValue} onChange={props.passwordOnChange}/>
            </Col>
            <Col>
                <ToggleButton size="sm" type="checkbox" variant="light" onChange={() =>{}}/>
            </Col>
            <Col>
                <p>Remember me</p>
            </Col>
            <Col>
                {/* <TextButton onClick={props.onClick}>Login</TextButton> */}
                <Button variant="link" onClick = {props.onClick}>Login</Button>
            </Col>
            <Col>
                {/* <TextButton>Forgot your password?</TextButton> */}
                <Button variant="link" onClick = {props.onClick}>Forgot your password?</Button>

            </Col>
        </Container>

    )
}

export default Login;

//
{/* <div className = "main">
<div className="flexbox-main">
</div>
</div> */}