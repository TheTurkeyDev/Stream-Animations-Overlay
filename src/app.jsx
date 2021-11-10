import { useState } from 'react';
import styled from 'styled-components';
import { Halloween1 } from './animations/fall/halloween-1';
import { Snow1 } from './animations/winter/snow-1';
import { useMJRWebSocket } from './hooks/useMJRWebSocket';
import { useTurkeyDevWebSocket } from './hooks/useTurkeyDevWebSocket';
import { getNonce } from './util/nonce';
import { getURLParams } from './util/url-params';

const ScreenWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`;

export const App = () => {
    const { token } = getURLParams(window.location.search);

    const [mjrConnectData, setMjrConnectData] = useState({
        type: 'LISTEN',
        nonce: getNonce(),
        channel_id: '',
        topics: ['channel_points_reward_redeem'],
        token: '',
    });
    const [animOut, setAnimOut] = useState(false);
    const [showId, setShowId] = useState('');
    const [userAnimData, setUserAnimData] = useState([]);

    useMJRWebSocket(mjrConnectData, (json) => {
        console.log(userAnimData)
        showAnim(userAnimData.find(anim => anim.channel_point_reward === json.reward.id));
    });

    useTurkeyDevWebSocket({
        'action': 'connect',
        'service': 'stream_animations',
        'token': token,
    }, (json) => onTurkeyDevMessage(json))

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
        }
    }

    const showAnim = (anim) => {
        if (showId !== '' || !anim)
            return;

        setShowId(anim.animation_id);
        setTimeout(() => {
            setAnimOut(true);
        }, anim.duration * 1000);
    }

    const hide = () => {
        if (animOut) {
            setAnimOut(false);
            setShowId('');
        }
    }

    return (
        <ScreenWrapper>
            {showId === 'halloween_1' && <Halloween1 out={animOut} onAnimationEnd={() => hide()} />}
            {showId === 'snowflake_1' && <Snow1 out={animOut} onAnimationEnd={() => hide()} />}
        </ScreenWrapper>
    );
}