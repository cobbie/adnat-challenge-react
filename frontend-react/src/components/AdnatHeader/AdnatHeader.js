import React from 'react';

import {Button} from 'react-bootstrap';

import './style.css'

const AdnatHeader = props => {
    return(
        <Button className="center" variant="link" bsPrefix="btn adnat-header" style={{fontSize: 50, color:"#3EB0D7"}} >Adnat</Button>
    )
}

export default AdnatHeader;