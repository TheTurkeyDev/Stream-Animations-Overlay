export const getDevAPIBase = () => {
    if (isDevEnv())
        return 'https://api.test.local';
    else
        return 'https://api.theturkey.dev';
}

export const getDevWSBase = () => {
    if (isDevEnv())
        return 'wss://ws.test.local';
    else
        return 'wss://ws.theturkey.dev';
}

export const isDevEnv = () => process.env.NODE_ENV && process.env.NODE_ENV === 'development';