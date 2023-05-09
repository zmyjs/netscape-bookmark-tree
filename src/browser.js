import { bookmarkParse, defaultOptions } from './utils.js';

const parseConfig = {
    parseHTML(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.childNodes;
    },
    getTag: node => node.nodeName.toLowerCase(),
    getName: node => node.textContent,
    getAttrs: node => Array.from(node.attributes),
    addAttrs(node, htmlNode) {
        const attrs = htmlNode.attributes;
        for (let i = 0; i < attrs.length; i++) {
            const attr = attrs[i];
            node[attr.name] = attr.value;
        }
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