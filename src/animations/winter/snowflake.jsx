import styled, { keyframes } from 'styled-components'

const snowflakesFall = keyframes`
    0% {
        top: -10%;
    }
    100% {
        top: 100%;
    }
`;

const snowflakesShake = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(80px);
    }
}`;

const SnowflakeWrapper = styled.div`
    color: #fff;
    font-size: 2em;
    font-family: Arial, sans-serif;
    text-shadow: 0 0 5px #000;
    position: fixed;
    top: -10%;
    z-index: 9999;
    user-select: none;
    cursor: default;
    animation-name: ${snowflakesFall}, ${snowflakesShake};
    animation-duration: 10s, 3s;
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite, infinite;
    animation-play-state: running, running;

    left: ${({ left }) => left};
    animation-delay: ${({ delay1, delay2 }) => `${delay1}s, ${delay2}s`};
`;

export const Snowflake = ({ character, left, delay1, delay2 }) => {

    return (
        <SnowflakeWrapper left={left} delay1={delay1} delay2={delay2}>
            {character}
        </SnowflakeWrapper>
    )
}