export function identity(p) {
    return p;
}

export function parse(parseHTML, string, option) {
    option = Object.assign({
        nameKey: 'name',
        childrenKey: 'children',
        idKey: 'id',
        idSplit: '_',
        each: identity
    }, option);

    const html = string.replace(/^[\s\S]+<\/TITLE>|<DT>|<p>/g, '');
    const rootNodes = parseHTML(html);

    function iterator(htmlNodes, parentNode) {
        const nodes = [];

        htmlNodes.forEach(function (htmlNode) {
            const type = htmlNode.nodeName;

            if (type === 'a' || type === 'h3' || type === 'h1') {
                const id = `${parentNode.id}${option.idSplit}${nodes.length}`;
                const node = { [option.idKey]: id };

                htmlNode.attrs.forEach(function (v) {
                    node[v.name] = v.value;
                });

                node[option.nameKey] = htmlNode.childNodes[0].value;

                option.each(node);
                nodes.push(node);
            } else if (type === 'dl') {
                const node = nodes[nodes.length - 1];
                node[option.childrenKey] = iterator(htmlNode.childNodes, node);
            }
        });

        return nodes;
    }

    const tree = iterator(rootNodes, { id: '' });

    return tree;
}