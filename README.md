# NETSCAPE-Bookmark-tree

[![npm](https://img.shields.io/npm/v/netscape-bookmark-tree.svg?color=%23CB3837)](https://www.npmjs.com/package/netscape-bookmark-tree)

[Example](https://zmyjs.github.io/netscape-bookmark-tree/example/)
[中文](README-CN.md)

Parse the **NETSCAPE-Bookmark-file-1** format bookmarks exported by the browser, convert it into a tree structure, and also convert the tree structure back to bookmarks.

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

```js
import { parse, stringify, defaultOptions } from 'netscape-bookmark-tree';
```

### parse()

```js
/**
 * Convert a bookmark string to a tree structure
 * @param {String} string bookmark file string
 * @param {Object} options default: `defaultOptions.parse`
 * @returns {Array} tree
 */
function parse(string, options) {
    return tree;
}
```

#### Parameter

- string

bookmark file string. Merge multiple bookmarks, and repeating, line breaks, indentation, and other formatting will not affect the interpretation.

If you haven't modified the file, the array returned will contain only one object (the root node). If you interpret multiple bookmark files merged together, the function will return an array with multiple objects.

```js
const bookmark0 = readFileSync('bookmarks_2023_5_5.html', 'utf-8');
const bookmark1 = bookmark0.replace(/\n/g, '');

const tree = bookmark.parse(bookmark0 + bookmark1);
tree.length;
// 2
```

- options

The following are all the properties.

```js
const options = {
    /**
    * Iterate over each node and return a new node.
    * This function is not the default value. The default value adds several common properties to the node: `{ id, pid, index }`.
    * @param {Object} node The node interpreted from the bookmark file
    * @param {Object} context The context information of the node
    * @param {Array} context.parentPath The array of parent nodes, for example: `[node.parent.parent, node.parent]`
    * @param {Boolean} context.isLeaf Whether the node is a leaf node. You cannot determine this by checking `node.children`, because when the node is being interpreted, its children have not yet been interpreted.
    * @param {Object} context.index The index of the node in the current array, which may be used to generate a unique ID.
    * @returns {Object} The new node
    */
    each(node, context) {
        return node;
    },
    /**
     * Set the children of the current node
     * The default value for the function is as follows
     * @param {Object} node 
     * @param {Array} children 
     */
    setChildren(node, children) {
        node.children = children;
    }
};
```

#### Custom Usage

- Custom Node Properties

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

- Return Different Nodes

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

### stringify()

```js
/**
 * Convert a bookmark tree to a bookmark string
 * @param {Array} tree
 * @param {Object} options default: `defaultOptions.stringify`
 * @returns {Array} List of bookmark strings
 */
function stringify(tree, options) {
    return files;
}
```

It should be noted that this function returns an array, not a string. The reason is explained in the parameter description below.

#### Parameter

- tree

Bookmark tree, corresponding to the structure returned by `parse()`.

Since `parse()` supports interpreting multiple bookmark files merged together, the array returned by `parse()` represents the root of each bookmark tree. Therefore, the return value of `stringify()` is also an array, and each element of the array is a bookmark file string.

```js
const bookmark0 = readFileSync('bookmarks_2019_5_5.html', 'utf-8');
const bookmark1 = readFileSync('bookmarks_2023_5_9.html', 'utf-8');
// Convert to tree
const tree = bookmark.parse(bookmark0 + bookmark1, {
    each(node, context) {
        // After converting to a tree structure, we usually don't care about the order of properties, but if we need to restore it to a string, we need to include the order of properties.
        node.attributes = context.attributes;
        // For example: { name: 'github', href: 'https://github.com/', attributes:[{name: 'href', value: 'https://github.com/'}] }
        return node;
    }
});
// Restore to string
const files = bookmark.stringify(tree);

files.length === tree.length;
// true
files[0] === bookmark0;
// true
files[1] === bookmark1;
// true
```
If the bookmark name contains HTML escape sequences such as `&amp`, the above example may result in `files[0]` not equaling `bookmark0`, but this does not affect the use.

- options

The following are all the properties.

```js
const options = {
    /**
     * Callback function for each node
     * The default value for the function is as follows
     * @param {Array} node Bookmark tree node
     * @param {Array} parentPath The array of parent nodes, for example: `[node.parent.parent, node.parent]`
     * @returns {Object} Return this object: `{ name, attributes, children }`
     * @property {number} name Tag name. Required
     * @property {number} attributes List of attributes, with each element in the array being: `{ name, value }`. Required.
     * @property {number} [children] If children is an array, it will be converted to an `<H3>` tag regardless of whether the array has elements or not. Otherwise, it will be converted to an `<A>` tag. Optional.
     */
    each(node, parentPath) {
        return node;
    },
    // End of Line. The default value is `os.EOL` in the Node.js environment and '\n' in the browser environment.
    eol: '\n'
};
```

#### Custom Usage

```js
const tree = bookmark.parse(text, {
    each(node, context) {
        return {
            myName: node.name,
            myAttrs: context.attributes
        };
    },
    setChildren(node, children) {
        node.myChild = children;
    }
});

const files = bookmark.stringify(tree, {
    each(node) {
        return {
            name: node.myName,
            attributes: node.myAttrs,
            children: node.myChild, 
        };
    }
});

files[0] === text;
// true
```

## defaultOptions

Default options.

```js
const defaultOptions = {
    // parse() default options
    parse: {},
    // stringify() default options
    stringify: {}
};
```

If you want to keep the system default features after customizing the configuration, you can do it like this.

```js
bookmark.parse(string, {
    each(node, context) {
        node.dearFather = lodash.last(context.parentPath);
        return bookmark.defaultOptions.parse(node, context);
    }
});
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
- The entry point has changed, and the module now exports `{ parse, stringify, defaultOptions }`.
- The options `name` and `split` have been removed and replaced with `each`.
- The option `children` has been removed and replaced with `setChildren`.

## License

[MIT](LICENSE)