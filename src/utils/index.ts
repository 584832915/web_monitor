export const roundByFour = (num: number, digits = 4) => {
    try {
        return parseFloat(num.toFixed(digits))
    } catch (err) {
        return num
    }
}

export const getLines = (stack: string) => {
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join('^');
}

export function randomNum(minNum: any, maxNum: any) {
    switch (arguments.length) {
        case 1:
            return parseInt((Math.random() * minNum + 1).toString(), 10);
        case 2:
            return parseInt((Math.random() * (maxNum - minNum + 1) + minNum), 10);
        default:
            return 120000;
    }
};