export function exec(reg, str) {
    let match, result = [];
    while (match = reg.exec(str)) {
        result.push(match);
    }
    return result;
}

export function identity(p) {
    return p;
}