import { useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export const useMJRWebSocket = (onConnectData, onChannelPointRedeem = () => { }, onMessage = () => { }, onResponse = () => { }) => {

    const ws = useRef(null);

    useEffect(() => {
        if (!onConnectData.token || !onConnectData.channel_id)
            return;

        ws.current = new ReconnectingWebSocket('wss://ws.mjrlegends.com:2096');
        ws.current.onopen = () => ws.current.send(JSON.stringify(onConnectData));
        ws.current.onclose = (event) => {
            if (event.wasClean)
                console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            else
                console.log('[close] Connection died');
        };

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, [onConnectData])

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = event => {
            const json = JSON.parse(event.data)
            if (json.type === 'RESPONSE') {
                onResponse(json);
            }
            else if (json.type === 'MESSAGE') {
                if (json.topic === 'channel_points_reward_redeem')
                    onChannelPointRedeem(json.message.redemption);
                onMessage(json);
            }
        };
    }, [onResponse, onChannelPointRedeem, onMessage, onConnectData]);

    return (message) => {
        ws.current.send(message);
    }
}