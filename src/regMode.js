import * as utils from './utils';

// 内容正则：目录|叶子节点
const reg = /(\s+)<DT><H3([\s\S]+?)>([\s\S]+?)<\/H3>\1<DL><p>([\s\S]+?)\1<\/DL><p>|<DT><A([\s\S]+?)>([\s\S]+?)<\/A>/g;
// 属性正则
const regAttr = /(\S+)="(\S+)"/g;

/**
 * 主转换函数
 * @param {String} string 书签的文本
 * @param {Object} option 配置选项
 * @param {String} last 用于生成id
 * @returns {Array}
 */
function getChild(string, option, last) {
    return utils.exec(reg, string).map(function (match, index) {
        let node = { id: last + index };
        let childStr = match[4], attrStr;

        if (childStr) {
            attrStr = match[2];
            node[option.name] = match[3];
            node[option.children] = getChild(childStr, option, node.id + option.split);
        } else {
            attrStr = match[5];
            node[option.name] = match[6];
        }

        utils.exec(regAttr, attrStr).map(function (attrMatch) {
            const key = attrMatch[1].toLowerCase();
            node[key] = attrMatch[2];
        });

        return option.each(node, match);
    });
}

export default function (string, option) {
    const match = string.match(utils.regWrap);

    if (match) {
        const fullOption = Object.assign({}, utils.defaultOption, option);
        return getChild(match[1], fullOption, '');
    } else {
        return match;
    }
}