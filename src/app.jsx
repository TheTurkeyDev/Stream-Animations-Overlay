import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Animation, FadeOut, SlideInTop, SlideOutTop } from './animations/animation-wrapper';
import { Halloween1 } from './animations/fall/halloween-1';
import { balloonsDelayDefault, balloonsDurationDefault, Balloons1 } from './animations/party/balloons-1';
import { ChristmasLights } from './animations/winter/christmas-lights';
import { Snow1 } from './animations/winter/snow-1';
import { useMJRWebSocket } from './hooks/use-mjr-websocket';
import { useTurkeyDevWebSocket } from './hooks/use-turkeydev-websocket';
import { isDevEnv } from './network/network';
import { Animations } from './util/animationsEnum';
import { getNonce } from './util/nonce';
import { getURLParams } from './util/url-params';

const ScreenWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: ${isDevEnv() ? '#232323' : ''};
`;

export const App = () => {
    const { token, forceShow } = getURLParams(window.location.search);

    const [mjrConnectData, setMjrConnectData] = useState({
        type: 'LISTEN',
        nonce: getNonce(),
        channel_id: '',
        topics: ['channel_points_reward_redeem'],
        token: '',
    });
    const [animOut, setAnimOut] = useState(false);
    const [showId, setShowId] = useState(forceShow ?? '');
    const [userAnimData, setUserAnimData] = useState([]);
    const [animationQueue, setAnimationQueue] = useState([]);

    useMJRWebSocket(mjrConnectData, (json) => {
        const animId = Object.keys(userAnimData).find(k => userAnimData[k].channel_point === json.reward.id);
        showAnim(animId, userAnimData[animId]);
    });

    useTurkeyDevWebSocket({
        'action': 'connect',
        'service': 'stream_animations',
        'token': token,
    }, (json) => onTurkeyDevMessage(json));

    useEffect(() => {
        if (showId === '' && animationQueue.length > 0) {
            const animId = animationQueue[0];
            showAnim(animId, userAnimData[animId]);
            setAnimationQueue([...animationQueue].slice(1));
        }

    }, [animationQueue, showId])

    const onTurkeyDevMessage = (json) => {
        if (json.success) {
            if (json.action === 'init_data') {
                setMjrConnectData(old => ({
                    ...old,
                    token: json.data.mjr_token,
                    channel_id: json.data.channel_id
                }));
                setUserAnimData(json.data.animation_user_data);
            }
            else if (json.action === 'update_animations') {
                setUserAnimData(json.data);
            }
            else if (json.action === 'test') {
                const animId = json.data.id;
                showAnim(animId, userAnimData[animId]);
            }
        }
    }

    const showAnim = (animId, data) => {
        if (!animId)
            return;

        if (showId !== '') {
            setAnimationQueue(old => [...old, animId]);
            return;
        }

        if (data.sound) {
            const audio = new Audio(data.sound);
            audio.play();
        }
        setShowId(animId);
        const delay = getDurationOfAnimation(animId, data);
        setTimeout(() => {
            if (!forceShow)
                setAnimOut(true);
        }, delay);
    }

    const getDurationOfAnimation = (animId, data) => {
        if (!data)
            return 10000;

        if (animId === Animations.BALLOONS_1) {
            return (parseInt(data.duration ?? balloonsDurationDefault) + parseInt(data.delay ?? balloonsDelayDefault) + 1) * 1000;
        }


        return parseInt(data.duration ?? 10) * 1000;
    }

    const hide = () => {
        if (animOut) {
            setAnimOut(false);
            setShowId('');
        }
    }

    return (
        <ScreenWrapper>
            <Animation component={<Halloween1 {...userAnimData[Animations.HALLOWEEN_1]} />} id={Animations.HALLOWEEN_1} shownId={showId} onAnimationEnd={() => hide()} animation={animOut ? SlideOutTop : SlideInTop} />
            <Animation component={<Snow1 {...userAnimData[Animations.SNOWFLAKE_1]} />} id={Animations.SNOWFLAKE_1} shownId={showId} onAnimationEnd={() => hide()} animation={animOut ? FadeOut : ''} />
            <Animation component={<ChristmasLights {...userAnimData[Animations.CHRISTMAS_LIGHTS_1]} />} id={Animations.CHRISTMAS_LIGHTS_1} shownId={showId} onAnimationEnd={() => hide()} animation={animOut ? SlideOutTop : SlideInTop} />
            <Animation component={<Balloons1 {...userAnimData[Animations.BALLOONS_1]} />} id={Animations.BALLOONS_1} shownId={showId} onAnimationEnd={() => hide()} animation={animOut ? FadeOut : ''} />
        </ScreenWrapper>
    );
}