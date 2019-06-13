const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const Renderer = require('vue-server-renderer');
const bookmark = require('../dist/bookmark.ast.cjs');

const filePath = {
    content: path.join(__dirname, 'bookmarks_2019_5_5.html'),
    template: path.join(__dirname, 'template.html'),
    index: path.join(__dirname, 'index.html'),
};

let content = fs.readFileSync(filePath.content, 'utf8');
let tree = bookmark(content);

const app = new Vue({
    render(h) {
        function renderList(tree, data) {
            let slots = tree.map(function (node) {
                const children = node.children;
                let liSlots = [];
                if (node.icon)
                    liSlots.push(h('img', { class: 'mr-1', attrs: { src: node.icon, width: 16 } }));

                if (children) {
                    liSlots.push(h('strong', node.name));
                    liSlots.push(renderList(children, data));
                } else {
                    liSlots.push(h('a', { attrs: { href: node.href } }, node.name));
                }

                return h('li', liSlots);
            });
            return h('ol', data, slots);
        }

        return h(
            'main',
            { class: 'container pt-5', attrs: { id: 'app' } },
            [
                h('section', { attrs: { id: 'render' }, class: 'my-5' }, [
                    h('h3', { class: 'mb-3' }, 'Sample rendering'),
                    renderList(tree)
                ]),
                h('section', { attrs: { id: 'array' }, class: 'my-5' }, [
                    h('h3', { class: 'mb-3' }, 'Result'),
                    h('pre', JSON.stringify(tree, null, '    '))
                ]),
                h('section', { attrs: { id: 'source' }, class: 'my-5' }, [
                    h('h3', { class: 'mb-3' }, 'Source data'),
                    h('pre', content)
                ])
            ]
        );
    }
});

let template = fs.readFileSync(filePath.template, 'utf8');
const renderer = Renderer.createRenderer({ template });

renderer.renderToString(app, function (err, html) {
    if (err) throw err;
    fs.writeFileSync(filePath.index, html, 'utf8');
});