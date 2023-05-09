export function last(array) {
    return array[array.length - 1];
}

export const defaultOptions = {
    /**
    * 遍历每个节点，返回新的节点
    * @param {Object} node 从书签文件解释的节点
    * @param {Object} context 节点上下文信息
    * @param {Array} context.parentPath 父节点集合，例如：[node.parent.parent, node.parent]
    * @param {Boolean} context.isLeaf 是否叶子节点，你不能通过node.children判断，因为解释到该节点时，它的子节点还没开始解释
    * @param {Object} context.index 节点在当前数组的索引，生成唯一ID可能会用到
    * @returns {Object} 新的节点
    */
    each(node, context) {
        const parent = last(context.parentPath),
            index = context.index;

        node.index = index;

        if (parent) {
            node.id = `${parent.id}_${index}`;
            node.pid = parent.id
        } else {
            node.id = index.toString();
        }

        return node;
    },
    /**
     * 设置当前节点的子节点
     * @param {Object} node 
     * @param {Array} children 
     */
    setChildren(node, children) {
        node.children = children;
    }
}


/**
 * 解释书签核心方法
 * @param {Object} parseConfig HTML解释器配置
 * @param {String} string 书签字符串
 * @param {Object} options 嵌套数组
 * @returns 
 */
export function bookmarkParse(parseConfig, string, options) {
    options = Object.assign({}, defaultOptions, options);

    function iterator(rawNodes, parentPath) {
        const nodes = [];

        rawNodes.forEach(function (rawNode) {
            const tag = parseConfig.getTag(rawNode);

            function push(isLeaf) {
                const index = nodes.length;
                let node = {
                    name: parseConfig.getName(rawNode),
                };
                parseConfig.addAttrs(node, rawNode);
                const context = { parentPath, isLeaf, index, rawNode };
                node = options.each(node, context) || node;
                nodes.push(node);
            }

            if (tag === 'a') {
                push(true);
            } else if (tag === 'h3' || tag === 'h1') {
                push(false);
            } else if (tag === 'dl') {
                const node = nodes[nodes.length - 1];
                const nodePath = parentPath.concat(node);
                const children = iterator(rawNode.childNodes, nodePath);
                options.setChildren(node, children);
            }
        });

        return nodes;
    }

    const html = string.replace(/<!DOCTYPE [\s\S]+?<\/TITLE>|<DT>|<p>/g, '');
    const tree = iterator(parseConfig.parseHTML(html), []);

    return tree;
}

export function eachTree(tree, callback) {
    function iterator(nodes) {
        nodes.forEach(function (node, index) {
            callback(node, index);

            if (node.children) {
                iterator(node.children);
            }
        });
    }

    iterator(tree);
}