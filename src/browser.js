import { bookmarkParse, bookmarkStringify, defaultParseOptions } from './utils.js';

const parseConfig = {
    parseHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.childNodes;
    },
    getTag: node => node.nodeName.toLowerCase(),
    getName: node => node.textContent,
    setAttrs(node, htmlNode) {
        const srcAttrs = htmlNode.attributes;
        const attrs = [];
        for (let i = 0; i < srcAttrs.length; i++) {
            const attr = srcAttrs[i];
            node[attr.name] = attr.value;
            attrs.push(attr);
        }
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