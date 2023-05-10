# NETSCAPE-Bookmark-tree

[![npm](https://img.shields.io/npm/v/netscape-bookmark-tree.svg?color=%23CB3837)](https://www.npmjs.com/package/netscape-bookmark-tree)

解释浏览器导出的 **NETSCAPE-Bookmark-file-1** 格式书签，转换成嵌套数组。

书签格式：

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

转换后格式：

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

[演示](https://zmyjs.github.io/netscape-bookmark-tree/example/)

## 使用

### Node.js

安装

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

// string 是书签文件字符串
const bookmarkTree =  bookmark.parse(string);
```

### 浏览器

浏览器需要使用带 `bookmark.browser.` 前缀的文件。

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
    // string 是书签文件字符串
    const bookmarkTree =  bookmark.parse(string);
</script>
```

## API

## parse()

```js
/**
 * 解释浏览器导出的格式书签，转换嵌套数组
 * @param {String} string 
 * @param {Object} options 
 * @returns {Array} 嵌套数组
 */
function parse(string, options) {
    return tree;
}
```

### bookmarkText

书签文件字符串。多书签合并，重复、换行、缩进、等不影响解释。

如果你没有改动文件，返回的数组里面只有一个对象（根节点），如果你把多个书签文件合并一起解释，这样就返回多个对象的数组。

```js
const bookmark1 = readFileSync('bookmarks_2019_5_5.html', 'utf-8');
const bookmark2 = readFileSync('bookmarks_2023_5_9.html', 'utf-8');
const bookmark3 = bookmark2.replace(/\n/g, '');

const tree = bookmark.parse(bookmark1 + bookmark2 + bookmark3);

tree.length;
// 3
```

### options

配置选项

```js
const options = {
    /**
    * 遍历每个节点，返回新的节点
    * @param {Object} node 从书签文件解释的节点
    * @param {Object} context 节点上下文信息
    * @param {Array} context.parentPath 父节点集合，例如：[node.parent.parent, node.parent]
    * @param {Boolean} context.isLeaf 是否叶子节点，你不能通过node.children判断，因为解释到该节点时，它的子节点还没开始解释
    * @param {Object} context.index 节点在当前数组的索引，生成唯一ID可能会用到
    * @returns {Object} 新的节点
    */
    each(node, context) {
        return node;
    },
    /**
     * 设置当前节点的子节点
     * @param {Object} node 
     * @param {Array} children 
     */
    setChildren(node, children) {
        node.children = children;
    }
};
```

## defaultOptions

默认配置。

默认的情况下，会给节点对象`node`添加一些上下文属性，例如`id`等，子节点存放在`node.children`。

如果你希望自定义配置之后，仍然保持系统默认特性，那么可以这样处理：

```js
bookmark.parse(string, {
    each(node, context) {
        node.dearFather = lodash.last(context.parentPath);
        return bookmark.defaultOptions(node, context);
    }
});
```

## 示例

虽然只有两个自定义选项，但是已经足够自由。

### 自定义节点属性

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

### 返回不一样的节点

例如你希望每个节点都是DOM，依然可以做到。

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

        // 返回的是 Element
        return li;
    },
    setChildren(li, children) {
        // 为 Element 添加子节点不再是简单添加属性
        children.forEach(function (el) {
            li.children[1].appendChild(el);
        });
    }
});

const ul = document.createElement('ul');
ul.appendChild(li);

document.body.appendChild(ul);
```

## 从v1迁移到v2

v2版本已经完全重写，并且API并不复杂，建议重新阅读API。

- 引用的文件变更，需要区分浏览器模式和Node.js模式
- 入口变更，现在模块会导出`{ defaultOptions, parse }`
- 废除选项`name`、`split`，使用`each`代替
- 废除选项`children`，使用`setChildren`代替

## 许可证

[MIT](LICENSE)