/**
 * netscape-bookmark-tree v0.1.1
 * Build 1557041942979
 * Zhu MaoYan
 */

'use strict';

function exec(reg, str) {
    let match, result = [];
    // eslint-disable-next-line no-cond-assign
    while (match = reg.exec(str)) {
        result.push(match);
    }
    return result;
}

function identity(p) {
    return p;
}

const regWrap = /<DL><p>([\s\S]+)<\/DL><p>/;
const reg = /(\s+)<DT><H3[\s\S]+?>([\s\S]+?)<\/H3>\1<DL><p>([\s\S]+?)\1<\/DL><p>|<DT><A[\s\S]+?HREF="(\S+)"[\s\S]+?ICON="(\S+)">([\s\S]+?)<\/A>/g;

function main(string, option) {
    return exec(reg, string).map(function (match) {
        const childStr = match[3];
        let node = {
            id: match.index
        };

        if (childStr) {
            node[option.name] = match[2];
            node[option.children] = main(childStr, option);
        } else {
            node[option.href] = match[4];
            node[option.icon] = match[5];
            node[option.name] = match[6];
        }

        return option.each(node, match);
    });
}

function index (str, opt) {
    let match = str.match(regWrap);
    if (!match) return match;

    let string = match[1],
        option = Object.assign({
            href: 'href',
            icon: 'icon',
            name: 'name',
            children: 'children',
            each: identity
        }, opt);

    return main(string, option);
}

module.exports = index;
