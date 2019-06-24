import React from 'react';
import TextButton from "../../components/TextButton/TextButton";

import './style.css';

const OrgActions = props => {
    return(
        <div>
            <div>
                <TextButton fontSize="40px">Adnat</TextButton>
                <p>Logged in as {props.name || "John Smith"}</p>
                <TextButton>Log Out</TextButton>
            </div>
            <div>
                <h1>{props.org || "Bob's Burgers"}</h1>
                <div>
                <TextButton>View Shifts</TextButton>
                <TextButton>Edit</TextButton>
                <TextButton>Leave</TextButton>
                </div>
            </div>
        </div>
    )
}

export default OrgActions;