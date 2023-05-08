export function parse(parseConfig, string, option) {
    option = Object.assign({
        each(node, parent, isLeaf, htmlNode) {
            return node;
        },
        setChildren(node, children) {
            node.children = children;
        }
    }, option);

    function iterator(htmlNodes, parent) {
        const pid = parent ? parent.id : Date.now();
        const nodes = [];

        htmlNodes.forEach(function (htmlNode) {
            const tag = parseConfig.getTag(htmlNode);

            function push(isLeaf) {
                const index = nodes.length;
                const id = `${pid}_${index}`;
                let node = {
                    index,
                    id,
                    pid,
                    name: parseConfig.getName(htmlNode),
                };
                parseConfig.addAttrs(node, htmlNode);

                node = option.each(node, parent, isLeaf, htmlNode);

                nodes.push(node);
            }

            if (tag === 'a') {
                push(true);
            } else if (tag === 'h3' || tag === 'h1') {
                push(false);
            } else if (tag === 'dl') {
                const node = nodes[nodes.length - 1];
                const children = iterator(htmlNode.childNodes, node);
                option.setChildren(node, children);
            }
        });

        return nodes;
    }

    const html = string.replace(/^[\s\S]+<\/TITLE>|<DT>|<p>/g, '');
    const tree = iterator(parseConfig.parseHTML(html), null);

    return tree;
}