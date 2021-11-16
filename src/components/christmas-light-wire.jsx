import styled from 'styled-components';

const Wire = styled.div`
    left: ${props => props.left}px;
    top: ${props => props.top}px;

    position: fixed;
    width: ${props => props.width}px;
    height: ${props => props.height}px;

    border: solid 10px #004400;
    border-color: transparent transparent #004400 transparent;
    border-radius: 50%/0 0 100% 100%;
`;

export const ChristmasLightWire = ({ left, top, toLeft, height }) => (
    <Wire left={left} top={top - (height + 10)} width={toLeft - left} height={height} />
);