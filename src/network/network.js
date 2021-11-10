export const getDevAPIBase = () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development')
        return 'https://api.test.local';
    else
        return 'https://api.theturkey.dev';
}

export const getDevWSBase = () => {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development')
        return 'wss://ws.test.local';
    else
        return 'wss://ws.theturkey.dev';
}