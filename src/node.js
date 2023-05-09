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

function parse(string, options) {
    return bookmarkParse(parseConfig, string, options);
}

export { defaultOptions, parse };

export default parse;