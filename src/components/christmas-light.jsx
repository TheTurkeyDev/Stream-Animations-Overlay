import styled from 'styled-components';

const Base = styled.div`
    left: ${props => props.left + 20}px;
    top: ${props => props.top - 30}px;

    position: fixed;
    background: black;
    width: 35px;
    height: 25px;
    z-index: 1; 
`

const LightBulb = styled.div`
    left: ${props => props.left}px;
    top: ${props => props.top}px;

    position: fixed;
    background: ${props => props.color};
    width: 75px;
    height: 75px;

    transform: rotate(45deg);

    border-radius: 50% 150% 10% 150%;

    z-index: 1;
`;

export const ChristmasLight = ({ left, top, color }) => (
    <>
        <Base left={left} top={top} />
        <LightBulb left={left} top={top} color={color} />
    </>
);