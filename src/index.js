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
 * @returns {Array}
 */
function main(string, option, last) {
    return utils.exec(reg, string).map(function (match, index) {
        let node = { id: last + index };
        let childStr = match[4], attrStr;

        if (childStr) {
            attrStr = match[2];
            node[option.name] = match[3];
            node[option.children] = main(childStr, option, node.id + option.split);
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
    const match = string.match(regWrap);

    if (match) {
        let defaultOption = {
            // 生成每个节点都会调用，返回新节点，函数签名：each(node, match)
            each: utils.identity,
            // 显示键名
            name: 'name',
            // 子节点键名
            children: 'children',
            // id分割线
            split: '_'
        };
        return main(match[1], Object.assign(defaultOption, option), '');
    } else {
        return match;
    }

}