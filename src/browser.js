import { parse, defaultOptions } from './utils.js';

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

export default {
    parse(string, options) {
        return parse(parseConfig, string, options);
    },
    defaultOptions
};