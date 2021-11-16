import styled, { keyframes } from 'styled-components';

const AnimationWrapper = styled.div`
    animation: ${props => props.animation} 1s ease-out;
`;

export const SlideInTop = keyframes`
    0% { transform: translateY(-100vh); }
    100% { transform: translateY(0); }
`

export const SlideOutTop = keyframes`
    0% { transform: translateY(0); }
    100% { transform: translateY(-100vh); }
`

export const FadeOut = keyframes`
    from { opacity: 1; }
    to { opacity: 0; }
`

export const Animation = ({ component, id, shownId, onAnimationEnd, animation }) => (
    id === shownId ?
        <AnimationWrapper animation={animation} onAnimationEnd={onAnimationEnd}>
            {component}
        </AnimationWrapper>
        :
        <></>
);