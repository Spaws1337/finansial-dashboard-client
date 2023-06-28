import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useFullScreen } from '../../utils/useFullScreen';

function Circle() {

    const {width, height } = useFullScreen();

    const moveOrb = keyframes`
        0%{
          transform: translate(0, 0);
        }
        50%{
          transform: translate(${width}px, ${height/2.1}px)
        }
        100%{
          transform: translate(0, 0);
        }
    `

    const CircleStyled = styled.div`
        width: 70vh;
        height: 70vh;
        position: absolute;
        border-radius: 50%;
        margin-top: -37vh;
        margin-left: -37vh;
        background: linear-gradient(180deg, #4DB6AC 0%, #B2EBF2 100%);
        filter: blur(300px);
        animation: ${moveOrb} 15s alternate linear infinite;
    `;

  return (
    <CircleStyled>

    </CircleStyled>
  )
}

export default Circle;