import styled, { keyframes } from 'styled-components';

const SpiderWrapper = styled.div`
    position: absolute;
    height: 40px;
    width: 50px;
    border-radius: 50%;
    margin: 40px 0 0 0;
    background: #110d04;

    left: ${({ left }) => left};
    animation: ${({ fromTop, travelDist, percent }) => SpiderMove(fromTop, travelDist, percent)} 5s infinite;

    &::before{
    width: 3px;
    background: #aaaaaa;
    left: 50%;
    top: -320px;
    height: 320px;
}

    & *, &:: before, &:: after, &: after, &:before {
    position: absolute;
    content: "";
}
`;

const SpiderMove = (fromTop, travelDist, percent) => keyframes`
    0%, 100% {
        margin-top: ${fromTop};
    }
    ${percent} {
        margin-top: ${`calc(${fromTop} + ${travelDist})`};
    }
`;

const LegsWriggleLeft = keyframes`
    0%, 100% {
        transform: rotate(36deg) skewX(-20deg);
    }

    25%, 75% {
        transform: rotate(15deg) skewX(-20deg);
    }
    
    50% {
        transform: rotate(45deg) skewX(-20deg);
    }
`

const LegsWriggleRight = keyframes`
     0%, 100% {
        transform: rotate(-36deg) skewX(20deg);
    }
    25%, 75% {
        transform: rotate(-15deg) skewX(20deg);
    }
    50% {
        transform: rotate(-45deg) skewX(20deg);
    }
`;

const SpiderEye = styled.div`
    top: 16px;
    height: 14px;
    width: 12px;
    background: #ffffff;
    border-radius: 50%;

    &::after {
        top: 6px;
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background: black;
    }
`;

const SpiderEyeLeft = styled(SpiderEye)`
    left: 14px;

    &::after {
        position: absolute;
        content: "";
        right: 3px;
    }
`;

const SpiderEyeRight = styled(SpiderEye)`
    right: 14px;

    &::after {
        position: absolute;
        content: "";
        left: 3px;
    }
`;

const SpiderLeg = styled.span`
    top: 6px;
    height: 12px;
    width: 14px;
    border-top: 2px solid #110d04;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    border-bottom: 1px solid transparent;

    &:nth-of-type(2) {
        top: 14px;
        left: -11px;
        animation: ${LegsWriggleLeft} 1s 0.8s infinite;
    }

    &:nth-of-type(3) {
        top: 22px;
        left: -12px;
        animation: ${LegsWriggleLeft} 1s 0.2s infinite;
    }

    &:nth-of-type(4) {
        top: 31px;
        left: -10px;
        animation: ${LegsWriggleLeft} 1s 0.4s infinite;
    }

    &:nth-of-type(6) {
        top: 14px;
        right: -11px;
        animation: ${LegsWriggleRight} 1s 0.4s infinite;
    }

    &:nth-of-type(7) {
        top: 22px;
        right: -12px;
        animation: ${LegsWriggleRight} 1s 0.7s infinite;
    }

    &:nth-of-type(8) {
        top: 31px;
        right: -10px;
        animation: ${LegsWriggleRight} 1s 0.3s infinite;
    }
`;

const SpiderLegLeft = styled(SpiderLeg)`
    left: -8px;
    transform-origin: top right;
    transform: rotate(36deg) skewX(-20deg);
    border-left: 2px solid #110d04;
    border-radius: 60% 0 0 0;
    animation: ${LegsWriggleLeft} 1s 0s infinite;
`

const SpiderLegRight = styled(SpiderLeg)`
    right: -8px;
    transform-origin: top left;
    transform: rotate(-36deg) skewX(20deg);
    border-right: 2px solid #110d04;
    border-radius: 0 60% 0 0;
    animation: ${LegsWriggleRight} 1s 0.2s infinite;
`

export const Spider = ({ left, fromTop, travelDist, percent }) => {
    return (
        <SpiderWrapper left={left} fromTop={fromTop} travelDist={travelDist} percent={percent}>
            <SpiderEyeLeft />
            <SpiderEyeRight />
            <SpiderLegLeft />
            <SpiderLegLeft />
            <SpiderLegLeft />
            <SpiderLegLeft />
            <SpiderLegRight />
            <SpiderLegRight />
            <SpiderLegRight />
            <SpiderLegRight />
        </SpiderWrapper>
    );
}