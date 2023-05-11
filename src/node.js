import { parseFragment } from 'parse5';
import { bookmarkParse, bookmarkStringify, defaultParseOptions } from './utils.js';

const parseConfig = {
    parseHTML(html) {
        const fragment = parseFragment(html);
        return fragment.childNodes;
    },
    getTag: node => node.nodeName,
    getName: node => node.childNodes[0].value,
    setAttrs(node, htmlNode) {
        const { attrs } = htmlNode;
        attrs.forEach(function (attr) {
            node[attr.name] = attr.value;
        });
        return attrs;
    }
};

/**
 * 解释浏览器导出的书签，转换嵌套数组
 * @param {String} string 书签字符串
 * @param {Object} options 选项
 * @returns {Array} 嵌套数组
 */
function parse(string, options) {
    return bookmarkParse(parseConfig, string, options);
}

const stringify = bookmarkStringify;

export { defaultParseOptions, parse, stringify };

export default parse;