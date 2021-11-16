import { useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { getDevWSBase } from '../network/network';

export const useTurkeyDevWebSocket = (openData, onMessageCallBack) => {

    const ws = useRef(null);

    useEffect(() => {
        ws.current = new ReconnectingWebSocket(getDevWSBase());
        ws.current.onopen = () => ws.current.send(JSON.stringify(openData));
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
    }, [])

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = event => {
            const json = JSON.parse(event.data)
            onMessageCallBack(json);
        };
    }, [onMessageCallBack]);

    return (message) => {
        ws.current.send(message);
    }
}