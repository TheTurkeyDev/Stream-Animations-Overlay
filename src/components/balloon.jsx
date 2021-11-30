import styled, { keyframes } from 'styled-components'

const balloonRise = keyframes`
    0% {
        top: 100%;
    }
    100% {
        top: -200px;
    }
`;

const BalloonWrapper = styled.div`
    position: fixed;
    top: -100%;
    animation-name: ${balloonRise};
    animation-duration: ${({ duration }) => duration}s;
    animation-timing-function: linear;
    animation-play-state: running;

    left: ${({ left }) => left}%;
    animation-delay: ${({ delay }) => `${delay}s`};
`;

const BalloonBall = styled.div`
  background: ${props => props.color};
    width: 75px;
    height: 75px;

    transform: rotate(45deg);

    border-radius: 65% 100% 10% 100%;

    z-index: 2;
`;

const String = styled.div`
    /* Clip edges, as some of the lines don't terminate nicely. */
    overflow: hidden;
    position: relative;
    width: 80px;
    height: 200px;
    z-index: 1;

    & > div {
        top: -55px;
        position: absolute;
        background: radial-gradient(circle, transparent, transparent 50px, #a8a8a8 50px, #a8a8a8 53px, transparent 54px);
        background-size: 160px 200px;
        width: 40px;
        height: 200px;
    }

    & > div:nth-child(2) {
        top: 3px;
        left: 39px;
        background-position: -125px 0px;
    }
`;

export const Balloon = ({ left, delay, duration, color }) => {

    return (
        <BalloonWrapper left={left} delay={delay} duration={duration}>
            <BalloonBall color={color} />
            <String>
                <div />
                <div />
            </String>
        </BalloonWrapper>
    )
}