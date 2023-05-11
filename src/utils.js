export function last(array) {
    return array[array.length - 1];
}

export function identity(p) {
    return p;
}

export const defaultParseOptions = {
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
            node.pid = parent.id;
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
};


/**
 * 解释书签核心方法
 * @param {Object} parseConfig HTML解释器配置
 * @param {String} string 书签字符串
 * @param {Object} options 嵌套数组
 * @returns 
 */
export function bookmarkParse(parseConfig, string, options) {
    options = Object.assign({}, defaultParseOptions, options);

    function iterator(rawNodes, parentPath) {
        const nodes = [];

        rawNodes.forEach(function (rawNode) {
            const tag = parseConfig.getTag(rawNode);

            function push(isLeaf) {
                const index = nodes.length;
                let node = {
                    name: parseConfig.getName(rawNode),
                };
                const attributes = parseConfig.setAttrs(node, rawNode);
                const context = { parentPath, isLeaf, index, attributes, tag };
                node = options.each(node, context, rawNode) || node;
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

export function bookmarkStringify(tree, callback = identity, childKey = 'children') {
    const indent = '    ';

    function getAttrStr(attrs) {
        return attrs
            ? attrs.reduce(function (t, v) {
                return `${t} ${v.name.toUpperCase()}="${v.value}"`;
            }, '')
            : '';
    }

    function iterator(nodes, parentPath) {
        return nodes.reduce(function (html, node) {
            const nodePath = parentPath.concat(node);
            const nodeIndent = parentPath.reduce(t => t + indent, '\n');
            node = callback(node, nodePath);
            const children = node[childKey];
            const name = node.name;
            const attrs = getAttrStr(node.attributes);
            let nodehtml;

            if (children && children.length) {
                const childHTML = iterator(children, nodePath);

                let start;

                if (parentPath.length) {
                    start = `<DT><H3${attrs}>${name}</H3>`;
                } else {
                    start = `<H1>${name}</H1>`;
                }

                nodehtml = [
                    start,
                    '<DL><p>',
                    indent + childHTML,
                    '</DL><p>'
                ].join(nodeIndent);
            } else {
                nodehtml = `<DT><A${attrs}>${name}</A>`;
            }

            return html ? html + nodeIndent + nodehtml : nodehtml;
        }, '');
    }

    let html = iterator(tree, []);

    html = `
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
${html}
`;

    html = html.trimStart();

    return html;
}