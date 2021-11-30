import { Fragment, useEffect, useState } from 'react';
import { ChristmasLight } from '../../components/christmas-light';
import { ChristmasLightWire } from '../../components/christmas-light-wire';
import { useInterval } from '../../hooks/use-interval';
import useWindowDimensions from '../../hooks/use-window-dimensions';

const colors = ['#d81414', '#e96710', '#fff000', '#16d816', '#261bca', '#a824e6'];
const bulbWidth = 75;
const top = 40;
const wireHeight = 25;

const getRandomColorIgnore = (ignore) => {
    let color = colors[0];
    do {
        color = colors[Math.floor(Math.random() * colors.length)];
    } while (color === ignore);

    return color;
}

export const ChristmasLights = ({ num_lights }) => {
    const numLights = parseInt(num_lights ?? 10);
    const { height, width } = useWindowDimensions();
    const [lights, setLights] = useState([]);

    const spacing = (width / numLights);
    const bulbHalfWidth = (bulbWidth / 2);

    useEffect(() => {
        if (numLights === 0 || width === 0 || height === 0)
            return;

        let prevColor = '';
        setLights(Array.from({ length: numLights }, (_, i) => {
            prevColor = getRandomColorIgnore(prevColor);
            return { top: top, left: (i * spacing) + bulbHalfWidth, color: prevColor }
        }));
    }, [width, height, numLights]);

    useInterval(() => {
        let prevColor = '';
        setLights(old => [
            ...old.map(light => {
                prevColor = getRandomColorIgnore(prevColor);
                return {
                    ...light,
                    color: prevColor
                }
            })
        ]);
    }, 1000);

    return (
        <>
            <ChristmasLightWire left={-spacing} top={top} toLeft={bulbWidth} height={wireHeight} />
            {
                lights.map((light, index) => (
                    <Fragment key={index}>
                        <ChristmasLight top={light.top} left={light.left} color={light.color} />
                        <ChristmasLightWire left={light.left + bulbHalfWidth - 10} top={light.top} toLeft={light.left + spacing + bulbHalfWidth - 10} height={wireHeight} />
                    </Fragment>
                ))
            }
        </>
    );
};