export function exec(reg, str) {
    let match, result = [];
    // eslint-disable-next-line no-cond-assign
    while (match = reg.exec(str)) {
        result.push(match);
    }
    return result;
}

export function identity(p) {
    return p;
}