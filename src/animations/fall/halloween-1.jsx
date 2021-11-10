/*
    https://codepen.io/rachel_web/pen/rrRQYW
*/
import styled, { keyframes } from 'styled-components';
import { Spider } from './spider';

const SlideIn = keyframes`
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(0); }
`

const SlideOut = keyframes`
    0% { transform: translateY(0); }
    100% { transform: translateY(-100vh); }
`

const Wrapper = styled.div`
  animation: ${props => props.out ? SlideOut : SlideIn} 1s ease-out;
`;


const WebRight = styled.img`
    position: absolute;
    height: 300px;
    width: auto;
    right: -10px;
    top: -10px;
    opacity: 0.7;
`

const WebLeft = styled.img`
    height: 300px;
    width: auto;
    position: absolute;
    left: -10px;
    top: -10px;
    transform: scaleX(-1);
    opacity: 0.7;
`

export const Halloween1 = ({ out, onAnimationEnd }) => {

    return (
        <Wrapper out={out} onAnimationEnd={onAnimationEnd}>
            <Spider left='5%' fromTop='193px' travelDist='113px' percent='34%' />
            <Spider left='20%' fromTop='128px' travelDist='96px' percent='44%' />
            <Spider left='35%' fromTop='171px' travelDist='47px' percent='43%' />
            <Spider left='65%' fromTop='190px' travelDist='52px' percent='62%' />
            <Spider left='80%' fromTop='108px' travelDist='100px' percent='62%' />
            <Spider left='95%' fromTop='166px' travelDist='120px' percent='66%' />
            <WebRight src='./res/imgs/spider-web.png' />
            <WebLeft src='./res/imgs/spider-web.png' />
        </Wrapper>
    )
}