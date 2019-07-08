import React from 'react';
import Button from '../Button/Button'
const LogOutButton = props => {
    return(
        <Button variant="link" onClick={props.onClickLogout}>Log Out</Button>
    )
}
export default LogOutButton;