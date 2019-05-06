import * as utils from './utils';

// 容器正则
const regWrap = /<DL><p>([\s\S]+)<\/DL>/;
// 内容正则：目录|叶子节点
const reg = /(\s+)<DT><H3([\s\S]+?)>([\s\S]+?)<\/H3>\1<DL><p>([\s\S]+?)\1<\/DL><p>|<DT><A([\s\S]+?)>([\s\S]+?)<\/A>/g;
// 属性正则
const regAttr = /(\S+)="(\S+)"/g;

/**
 * 主转换函数
 * @param {String} string 书签的文本
 * @param {Object} option 配置选项
 */
function main(string, option) {
    return utils.exec(reg, string).map(function (match) {
        let node = { id: match.index };
        let childStr = match[4], attrStr;

        if (childStr) {
            attrStr = match[2];
            node[option.name] = match[3];
            node[option.children] = main(childStr, option);
        } else {
            attrStr = match[5];
            node[option.name] = match[6];
        }

        utils.exec(regAttr, attrStr)
            .map(function (attrMatch) {
                const key = attrMatch[1].toLowerCase();
                node[key] = attrMatch[2];
            });

        return option.each(node, match);
    });
}

/**
 * 入口函数
 * @param {String} str 书签的文本
 * @param {Object} opt 配置选项
 */
export default function (str, opt) {
    let match = str.match(regWrap);
    if (!match) return match;

    let string = match[1],
        option = Object.assign({
            name: 'name',
            children: 'children',
            each: utils.identity
        }, opt);

    return main(string, option);
}