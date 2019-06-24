import React from 'react';
import styled, { css } from 'styled-components'

const Button = styled.button`
    width: ${props => props.width || "25px"};
    height: ${props => props.height || "15px"};
`

export default Button;