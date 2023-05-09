export function last(array) {
    return array[array.length - 1];
}

export const defaultOptions = {
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
    setChildren(node, children) {
        node.children = children;
    }
}

export function parse(parseConfig, string, options) {
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

    const html = string.replace(/^[\s\S]+<\/TITLE>|<DT>|<p>/g, '');
    const tree = iterator(parseConfig.parseHTML(html), []);

    return tree;
}