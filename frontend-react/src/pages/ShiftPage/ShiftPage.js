import React from 'react';
import TextButton from '../../components/TextButton/TextButton'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import './style.css'

const ShiftPage = () => {
    return(
    <div>
        <div>
            <TextButton fontSize="40px">Adnat</TextButton>
            <p>Logged in as John Smith.</p><TextButton>Log out</TextButton>
        </div>
        <div>
            <h1>Bob's Burgers</h1>
            <h3>Shifts</h3>
            <table>
            <thead>
                <tr>
                    <th>Employee name</th>
                    <th>Shift date</th>
                    <th>Start time</th>
                    <th>Finish time</th>
                    <th>Break length (minutes)</th>
                    <th>Hours worked</th>
                    <th>Shift cost</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                    </tr>
                    <tr>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                    </tr><tr>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                        <td>temp</td>
                    </tr><tr>
                        <td>temp</td>
                        <td><Input /></td>
                        <td><Input /></td>
                        <td><Input /></td>
                        <td><Input /></td>
                        <td colSpan="2"><Button width="90px" height="20px">Create shift</Button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
}

export default ShiftPage;