import { parse } from './utils.js';

function parseHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.childNodes;
}

export default function (string, option) {
    return parse(parseHTML, string, option);
}