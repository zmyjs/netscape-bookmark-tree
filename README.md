# NETSCAPE-Bookmark-tree

[![npm](https://img.shields.io/npm/v/netscape-bookmark-tree.svg?color=%23CB3837)](https://www.npmjs.com/package/netscape-bookmark-tree)

[Example](https://zmyjs.github.io/netscape-bookmark-tree/example/)
[中文](README-CN.md)

Parse the **NETSCAPE-Bookmark-file-1** format bookmarks exported by the browser and convert them into nested arrays.

---

Bookmark file format:

```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    ...
</DL><p>
```

Converted format:

```json
[
    {
        "name": "Bookmarks",
        "index": 0,
        "id": "0",
        "children": [
            {
                "name": "收藏夹栏",
                "index": 0,
                "id": "0_0",
                "pid": "0",
                "children": [
                    {
                        "name": "GitHub",
                        "href": "https://github.com/zmyjs",
                        "icon": "data:image/png;base64,...",
                        "index": 0,
                        "id": "0_0_0",
                        "pid": "0_0"
                    },
                    { "name": "..." }
                ]
            },
            { "name": "..." }
        ]
    }
]
```

## Basic Usage

### Node.js

Installation

```sh
npm install netscape-bookmark-tree
```

#### ESM

```js
// netscape-bookmark-tree/bookmark.js
import { readFileSync } from 'node:fs';
import { parse as bookmarkParse } from 'netscape-bookmark-tree';

const string = readFileSync('bookmarks_2023_5_9.html', 'utf-8');
const bookmarkTree = bookmarkParse(string);
```

#### CommonJS

```js
const bookmark = require('netscape-bookmark-tree/bookmark.cjs');

// string: bookmark file string
const bookmarkTree =  bookmark.parse(string);
```

### Browser

The browser requires the file to be prefixed with `bookmark.browser`.

#### ESM

```html
<script type="module">
    import * as bookmark from "https://unpkg.com/netscape-bookmark-tree/bookmark.browser.js";

    const res = await fetch('bookmarks_2023_5_9.html');
    const string = await res.text();

    const bookmarkTree =  bookmark.parse(string);
</script>
```

#### iife

```html
<script src="https://unpkg.com/netscape-bookmark-tree/bookmark.browser.iife.js"></script>
<script>
    // string: bookmark file string
    const bookmarkTree =  bookmark.parse(string);
</script>
```

## API

## parse()

```js
/**
 * Convert bookmarks into a nested array
 * @param {String} string 
 * @param {Object} options 
 * @returns {Array} tree
 */
function parse(string, options) {
    return tree;
}
```

### bookmarkText

bookmark file string. Merge multiple bookmarks, and repeating, line breaks, indentation, and other formatting will not affect the interpretation.

If you haven't modified the file, the array returned will contain only one object (the root node). If you interpret multiple bookmark files merged together, the function will return an array with multiple objects.

```js
const bookmark1 = readFileSync('bookmarks_2019_5_5.html', 'utf-8');
const bookmark2 = readFileSync('bookmarks_2023_5_9.html', 'utf-8');
const bookmark3 = bookmark2.replace(/\n/g, '');

const tree = bookmark.parse(bookmark1 + bookmark2 + bookmark3);

tree.length;
// 3
```

### options

```js
const options = {
    /**
    * Iterate over each node and return a new node.
    * @param {Object} node The node interpreted from the bookmark file
    * @param {Object} context The context information of the node
    * @param {Array} context.parentPath The array of parent nodes, for example: [node.parent.parent, node.parent]
    * @param {Boolean} context.isLeaf Whether the node is a leaf node. You cannot determine this by checking node.children, because when the node is being interpreted, its children have not yet been interpreted.
    * @param {Object} context.index The index of the node in the current array, which may be used to generate a unique ID.
    * @returns {Object} The new node
    */
    each(node, context) {
        return node;
    },
    /**
     * Set the children of the current node
     * @param {Object} node 
     * @param {Array} children 
     */
    setChildren(node, children) {
        node.children = children;
    }
};
```

## defaultParseOptions

Default options.

By default, some contextual properties, such as `id`, will be added to the node object `node`, and the child nodes will be stored in `node.children`.

If you want to customize the configuration but still maintain the system's default features, you can handle it in the following way:

```js
bookmark.parse(string, {
    each(node, context) {
        node.dearFather = lodash.last(context.parentPath);
        return bookmark.defaultParseOptions(node, context);
    }
});
```

## Custom Usage

Although there are only two custom options, they provide enough flexibility.

### Custom Node Properties

```js
bookmark.parse(string, {
    each(node, context) {
        node.title = node.name;
        return node;
    },
    setChildren(node, children) {
        node.naughtyChild = children;
    }
});
```

### Return Different Nodes

For example, if you want each node to be a DOM element, you can still achieve that.

```js
const [li] = bookmark.parse(string, {
    each(node, context) {
        const li = document.createElement('li');

        if (context.isLeaf) {
            const label = document.createElement('a');

            label.textContent = node.name;
            label.href = node.href;

            li.appendChild(label);
        } else {
            const label = document.createElement('label');
            const ul = document.createElement('ul');

            label.textContent = node.name;

            li.appendChild(label);
            li.appendChild(ul);
        }

        // Element
        return li;
    },
    setChildren(li, children) {
        // Adding child nodes to an Element is no longer a simple attribute addition
        children.forEach(function (el) {
            li.children[1].appendChild(el);
        });
    }
});

const ul = document.createElement('ul');
ul.appendChild(li);

document.body.appendChild(ul);
```

## Test

### Node.js

```sh
npm test
```

### Browser

```sh
npm start
```
Open this webpage: http://localhost:3000/test/browser

## Migrating from v1 to v2

v2 has been refactored and the API is not complicated. It is recommended to read the documentation again.

- The imported files have changed and need to be distinguished between browser mode and Node.js mode.
- The entry point has changed, and the module now exports `{ defaultParseOptions, parse }`.
- The options `name` and `split` have been removed and replaced with `each`.
- The option `children` has been removed and replaced with `setChildren`.

## License

[MIT](LICENSE)