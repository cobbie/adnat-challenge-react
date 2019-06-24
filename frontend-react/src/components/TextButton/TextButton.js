import React from 'react';
import styled, { css } from 'styled-components';

const TextButton = styled.p`
    color: ${props => props.color || 'blue'};
    text-decoration: underline;
    font-size: ${props => props.fontSize || "12px"}
`

export default TextButton;