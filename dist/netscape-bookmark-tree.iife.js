/**
 * netscape-bookmark-tree v0.1.0
 * Build 1557024354952
 * Zhu MaoYan
 */

var bookmark = (function () {
    'use strict';

    function exec(reg, str) {
        let match, result = [];
        while (match = reg.exec(str)) {
            result.push(match);
        }
        return result;
    }

    function identity(p) {
        return p;
    }

    function main(str, option) {
        const reg = /(<DT><H3[\s\S]+?>([\s\S]+?)<\/H3>\s*)?<DL><p>([\s\S]+)<\/DL><p>|<DT><A[\s\S]+?HREF="(\S+)"[\s\S]+?ICON="(\S+)">([\s\S]+?)<\/A>/g;

        option = Object.assign({
            href: 'href',
            icon: 'icon',
            name: 'name',
            children: 'children',
            each: identity
        }, option);

        return exec(reg, str).map(function (match) {
            const childStr = match[3];
            let node = {
                id: match.index
            };

            if (childStr) {
                node[option.name] = match[2];
                node[option.children] = main(childStr);
            } else {
                node[option.href] = match[4];
                node[option.icon] = match[5];
                node[option.name] = match[6];
            }

            return option.each(node, match);
        });
    }

    return main;

}());
