import { bookmarkParse, bookmarkStringify, parseDefaultOptions, identity } from './utils.js';

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
            attrs.push([attr.name, attr.value]);
        }
        return attrs;
    }
};

const defaultOptions = {
    parse: parseDefaultOptions,
    stringify: {
        each: identity,
        eol: '\n'
    }
};

/**
 * 把书签字符串转换成书签树
 * @param {String} string 书签字符串
 * @param {Object} options 选项
 * @returns {Array} 嵌套数组
 */
function parse(string, options) {
    options = Object.assign({}, defaultOptions.parse, options);
    return bookmarkParse(parseConfig, string, options.each, options.setChildren);
}

/**
 * 把书签树转换成书签字符串
 * @param {Array} tree 书签字树
 * @param {Object} options 选项
 * @returns {Array} 书签字符串列表
 */
function stringify(tree, options) {
    options = Object.assign({}, defaultOptions.stringify, options);
    return bookmarkStringify(tree, options.each, options.eol);
}

export { parse, stringify, defaultOptions };

export default parse;