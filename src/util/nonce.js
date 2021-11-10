const CHARACTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
export const getNonce = () => {
    let toReturn = '';
    for (let i = 0; i < 64; i++)
        toReturn += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    return toReturn;
}