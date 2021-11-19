import { useEffect, useState } from 'react';
import { Balloon } from '../../components/balloon';

const colors = ['#d81414', '#e96710', '#fff000', '#16d816', '#261bca', '#a824e6'];

export const numberOfBalloonsDefault = 100;
export const balloonsDelayDefault = 15;
export const balloonsDurationDefault = 8;

const getRandomColorIgnore = (ignore) => {
    let color = colors[0];
    do {
        color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === ignore);

    return color;
}

export const Balloons1 = ({ number_of_balloons = numberOfBalloonsDefault, delay = balloonsDelayDefault, duration = balloonsDurationDefault }) => {

    const [balloons, setBalloons] = useState([]);

    const spacing = (100 / number_of_balloons);

    useEffect(() => {
        if (number_of_balloons === 0)
            return;

        let prevColor = '';
        setBalloons(Array.from({ length: number_of_balloons }, (_, i) => {
            prevColor = getRandomColorIgnore(prevColor);
            return { left: (i * spacing), color: prevColor, delay: Math.random() * delay }
        }));
    }, [number_of_balloons]);

    return (
        <>
            {
                balloons.map((balloon, index) => (
                    <Balloon key={index} left={balloon.left} delay={balloon.delay} color={balloon.color} duration={duration} />
                ))
            }
        </>
    );
};