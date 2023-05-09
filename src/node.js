import { parseFragment } from 'parse5';
import { bookmarkParse, defaultOptions } from './utils.js';

const parseConfig = {
    parseHTML(html) {
        const fragment = parseFragment(html);
        return fragment.childNodes;
    },
    getTag: node => node.nodeName,
    getName: node => node.childNodes[0].value,
    addAttrs(node, htmlNode) {
        htmlNode.attrs.forEach(function (attr) {
            node[attr.name] = attr.value;
        });
    }
};

/**
 * 解释浏览器导出的格式书签，转换嵌套数组
 * @param {String} string 
 * @param {Object} options 
 * @returns {Array} 嵌套数组
 */
function parse(string, options) {
    return bookmarkParse(parseConfig, string, options);
}

export { defaultOptions, parse };

export default parse;