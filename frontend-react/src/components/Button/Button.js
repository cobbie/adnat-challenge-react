import React from 'react';
import styled, { css } from 'styled-components'
import { Button as BootstrapButton } from 'react-bootstrap';

const Button = styled(BootstrapButton)`
    width: ${props => props.width || "90px"};
    height: ${props => props.height || "40px"};
`


export default Button;