'use strict';

const reg = /(<DT><H3[\s\S]+?>([\s\S]+?)<\/H3>\s*)?<DL><p>([\s\S]+)<\/DL><p>|<DT><A[\s\S]+?HREF="(\S+)"[\s\S]+?ICON="(\S+)">([\s\S]+?)<\/A>/g;

function exec(reg, str) {
    let match; result = [];
    while (match = reg.exec(str)) {
        result.push(match);
    }
    return result;
}

function noop() {
    return arguments[0];
}

function getNodes(str, callback = noop) {
    return exec(reg, str).map(function (match) {
        const childStr = match[3];
        let node = {
            id: match.index
        };

        if (childStr) {
            node.name = match[2];
            node.children = getNodes(childStr);
        } else {
            node.href = match[4];
            node.icon = match[5];
            node.name = match[6];
        }

        return callback(node, match);
    });
}

function treeEach(tree, callback) {
    function each(arr, parent) {
        arr.forEach(function (node) {
            callback(node, parent);
            if (node.children)
                each(node.children, node);
        });
    }
    each(tree, null);
    return tree;
}

var index = {
    get: getNodes,
    each: treeEach
};

module.exports = index;
