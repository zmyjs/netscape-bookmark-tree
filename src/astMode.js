import parse5 from 'parse5';
import * as utils from './utils';

/**
 * 主转换函数
 * @param {Array} nodes 节点列表
 * @param {Object} option 配置选项
 * @param {String} last 用于生成id
 * @returns {Array}
 */
function getChild(nodes, option, last) {
    let items = [];

    nodes.forEach(function (node) {
        if (node.nodeName !== 'dt') return;

        let item = { id: last + items.length };

        node.childNodes.forEach(function (n) {
            const type = n.nodeName;
            if (type === 'h3' || type === 'a') {
                item[option.name] = n.childNodes[0].value;
                n.attrs.forEach(function (v) {
                    item[v.name] = v.value;
                });
            } else if (type === 'dl') {
                item[option.children] = getChild(n.childNodes, option, item.id + option.split);
            }
        });

        items.push(option.each(item));
    });

    return items;
}

export default function (string, option) {
    const match = string.match(utils.regWrap);

    if (match) {
        const fullOption = Object.assign({}, utils.defaultOption, option);
        const html = match[1].replace(/<p>/g, ''),
            fragment = parse5.parseFragment(html);

        return getChild(fragment.childNodes, fullOption, '');
    } else {
        return match;
    }
}