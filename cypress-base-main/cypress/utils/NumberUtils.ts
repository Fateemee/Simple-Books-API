export function randomNum(max) {
    return Math.floor(Math.random() * max);
}

export function randomChar() {
    return String.fromCharCode(randomNum(100));
}

export const randomString = (length): string => {
    let str = "";
    for (let i = 0; i < length; ++i) {
        str += randomChar();
    }
    return str;
};