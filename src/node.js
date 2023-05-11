import { parseFragment } from 'parse5';
import os from 'node:os';
import { bookmarkParse, bookmarkStringify, defaultParseOptions, identity } from './utils.js';

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

const defaultOptions = {
    parse: defaultParseOptions,
    stringify: {
        each: identity,
        eol: os.EOL
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
 * @param {*} tree 
 * @param {*} options 
 * @returns 
 */
function stringify(tree, options) {
    options = Object.assign({}, defaultOptions.stringify, options);
    return bookmarkStringify(tree, options.each, options.eol);
}

export { parse, stringify, defaultOptions };

export default parse;