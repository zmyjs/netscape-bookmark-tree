import { parseFragment } from 'parse5';
import { parse } from './utils.js';

function parseHTML(html) {
    const fragment = parseFragment(html);
    return fragment.childNodes;
}

export default function (string, option) {
    return parse(parseHTML, string, option);
}