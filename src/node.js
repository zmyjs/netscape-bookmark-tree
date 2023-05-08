import { parseFragment } from 'parse5';
import { parse } from './utils.js';

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
}

export default function (string, option) {
    return parse(parseConfig, string, option);
}