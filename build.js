const fs = require("fs");
const Vue = require('vue');
const Renderer = require('vue-server-renderer');
const NBTree = require('./netscape-bookmark-tree');

let content = fs.readFileSync('src/bookmarks.html', 'utf8');
content = content.replace(/<\![\s\S]+H1>/g, '');

let tree = NBTree.get(content);

const app = new Vue({
    render(h) {
        function ol(tree) {
            let slots = tree.map(function (node) {
                const children = node.children;
                let liSlots = [];
                if (node.icon)
                    liSlots.push(h('img', { attrs: { src: node.icon } }));

                if (children) {
                    liSlots.push(h('span', node.name));
                    liSlots.push(ol(children));
                } else {
                    liSlots.push(h('a', { attrs: { href: node.href } }, node.name));
                }
                return h('li', liSlots);
            });
            return h('ol', slots);
        }

        return h('div', { attrs: { id: 'root' } }, [ol(tree[0].children)]);
    }
});

let template = fs.readFileSync('src/index.html', 'utf8');
const renderer = Renderer.createRenderer({ template });

renderer.renderToString(app, function (err, html) {
    if (err) throw err
    fs.writeFileSync('dist/index.html', html, 'utf8');
});