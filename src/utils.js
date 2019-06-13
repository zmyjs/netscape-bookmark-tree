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

// 容器正则
export const regWrap = /<DL><p>([\s\S]+)<\/DL>/;

// 默认参数
export const defaultOption = {
    // 生成每个节点都会调用，返回新节点，函数签名：each(node, match)
    each: identity,
    // 显示键名
    name: 'name',
    // 子节点键名
    children: 'children',
    // id分割线
    split: '_'
};