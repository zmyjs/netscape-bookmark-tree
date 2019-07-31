# NETSCAPE-Bookmark-tree

[中文](README.md)

[![npm](https://img.shields.io/npm/v/netscape-bookmark-tree.svg?color=%23CB3837)](https://www.npmjs.com/package/netscape-bookmark-tree)

Parse a **NETSCAPE-Bookmark-file-1** style bookmarks string into nested array.

## Example

https://kobezhu.github.io/netscape-bookmark-tree/example

## Installation

Using npm

```sh
npm install netscape-bookmark-tree
```

在NPM包的**dist/**目录包含多种构建版本，它们区别如下：

- umd – Universal Module Definition, works as amd, cjs and iife all in one.
- esm – Keep the bundle as an ES module file.
- ast.cjs - Rely on the CommonJS version of **prse5**.
- ast.esm - Rely on the ES module version of **prse5**.

## Usage

### Node.js

In general:

```sh
const fs = require('fs');
const bookmark = require('netscape-bookmark-tree');

let content = fs.readFileSync('bookmarks.html', 'utf8');
let tree = bookmark(content);

console.log(tree);
```

The default module USES regular explanations, and if your bookmarks have been modified (compressed, deleted, etc.), they may not be recognized properly.
At this point, you need to rely on [parse5](https://github.com/inikulin/parse5) for subtle transformations.
But it's more expensive. It is best not to change bookmark files directly.

Use with parse5

1. Install parse5 using npm
```sh
npm install parse5
```

2. Use the AST version of the module
```js
const bookmark = require('netscape-bookmark-tree/dist/bookmark.ast.cjs');
```

As well as other.

### Browser

Using the global variable 'bookmark'.

## API

The module is very simple, and has only one method, the method returns an array.

```
/**
 * @param {String} string Bookmark text
 * @param {Object} option Configuration Options
 */
bookmark(string, option);
```

### Parameters

1. string

NETSCAPE-Bookmark-file-1 file format bookmarks string, The file starts with the following text:

```
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
```

> [Related documentation](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v=vs.85))

2. option

```
{
    // Invokes function for each node. Signature: each(node, match)
    each: utils.identity,
    // Display key
    name: 'name',
    // Children key
    children: 'children',
    // ID split
    split: '_'
}
```

### Returns

If the input parameters are correct, you see the value of the returned result as nested array,
if not, then return `null`.

```
[
    {
        "id": "0",
        "name": "书签栏",
        "add_date": "1534832849",
        "last_modified": "1557029578",
        "personal_toolbar_folder": "true",
        "children": [
            {
                "id": "0_0",
                "name": "GitHub",
                "href": "https://github.com/",
                "add_date": "1548396453",
                "icon": "data:image/png;base64,iV..."
            }
        ]
    }
]
```

## License

[MIT](LICENSE)