const fs = require('fs');
const path = require('path');
const Vue = require('vue');
const Renderer = require('vue-server-renderer');
const bookmark = require('../dist/bookmark.cjs');

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

        return h('div', { class: 'p-3', attrs: { id: 'app' } }, [
            h('h1', [
                'NETSCAPE-Bookmark-tree',
                h('a', { class: 'ml-5', attrs: { href: 'https://github.com/kobezhu/netscape-bookmark-tree/blob/master/README.md' } }, 'Documentation')
            ]),
            h('nav', { class: 'my-5' }, [
                h('h2', 'Navigation'),
                h('a', { class: 'mr-5', attrs: { href: '#render' } }, 'Sample rendering'),
                h('a', { class: 'mr-5', attrs: { href: '#array' } }, 'Result'),
                h('a', { class: 'mr-5', attrs: { href: '#source' } }, 'Source data')
            ]),
            h('section', { attrs: { id: 'render' }, class: 'mb-5' }, [
                h('h2', 'Sample rendering'),
                renderList(tree)
            ]),
            h('section', { attrs: { id: 'array' }, class: 'mb-5' }, [
                h('h2', 'Result'),
                h('pre', JSON.stringify(tree, null, '    '))
            ]),
            h('section', { attrs: { id: 'source' }, class: 'mb-5' }, [
                h('h2', 'Source data'),
                h('pre', content)
            ]),
            h('section', [
                h('a', { attrs: { href: '#app' } }, 'Top'),
            ])
        ]);

    }
});

let template = fs.readFileSync(filePath.template, 'utf8');
const renderer = Renderer.createRenderer({ template });

renderer.renderToString(app, function (err, html) {
    if (err) throw err;
    fs.writeFileSync(filePath.index, html, 'utf8');
});