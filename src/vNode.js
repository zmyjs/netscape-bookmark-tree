let template = 'a1<p title="abc"><i>a</i></p>b<i>c</i>d';

function getNodes(template) {
    const interpolate = /<(\w+)([\s\S]*?)>([\s\S]+?)<\/\1>/g,
        attrM = /(\S+)\="(\S+)"/g;

    let list = [], match = null;

    function textNode(start, end) {
        let data = template.slice(start, end);
        if (data) {
            let vNode = { data, nodeName: '#text' }
            list.push(vNode);
        }
    }

    function node(match) {
        const innerHTML = match[3],
            attr = match[2];

        let vNode = {
            outerHTML: match[0],
            nodeName: match[1],
            innerHTML,
            attr
        };
        if (innerHTML)
            vNode.childNodes = getNodes(innerHTML);
        list.push(vNode);
    }

    do {
        let start = interpolate.lastIndex;
        match = interpolate.exec(template);
        if (match) {
            textNode(start, match.index);
            node(match);
        } else {
            textNode(start);
        }
    } while (match);

    return list;
}