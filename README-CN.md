# NETSCAPE-Bookmark-tree

[![npm](https://img.shields.io/npm/v/netscape-bookmark-tree.svg?color=%23CB3837)](https://www.npmjs.com/package/netscape-bookmark-tree)

[演示](https://zmyjs.github.io/netscape-bookmark-tree/example/) [English](README.md)

解释浏览器导出的 **NETSCAPE-Bookmark-file-1** 格式书签，转换成树结构，也可以把树结构转换回书签。

---

书签文件格式：

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

转换后的格式：

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

## 基本使用

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

// string: 书签文件字符串
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
    // string: 书签文件字符串
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
 * 把书签字符串转换成树结构
 * @param {String} string 书签字符串
 * @param {Object} options 选项，默认值：`defaultOptions.parse`
 * @returns {Array} 树
 */
function parse(string, options) {
    return tree;
}
```

#### 参数

- string

书签文件字符串。多书签合并，重复、换行、缩进、等不影响解释。

如果你没有改动文件，返回的数组里面只有一个对象（根节点），如果你把多个书签文件合并一起解释，这样就返回多个对象的数组。

```js
const bookmark0 = readFileSync('bookmarks_2023_5_5.html', 'utf-8');
const bookmark1 = bookmark0.replace(/\n/g, '');

const tree = bookmark.parse(bookmark0 + bookmark1);
tree.length;
// 2
```

- options

选项，下面是全部属性。

```js
const options = {
    /**
    * 遍历每个节点，返回新的节点
    * 本函数并不是默认值，默认值会为node添加几个常用属性：`{ id, pid, index }`
    * @param {Object} node 从书签文件解释的节点
    * @param {Object} context 节点上下文信息
    * @param {Array} context.parentPath 父节点集合，例如：`[node.parent.parent, node.parent]`
    * @param {Boolean} context.isLeaf 是否叶子节点，你不能通过`node.children`判断，因为解释到该节点时，它的子节点还没开始解释
    * @param {Object} context.index 节点在当前数组的索引，生成唯一ID可能会用到
    * @param {Array} context.attributes 节点属性的数组形式，如果要转换回书签字符串可能会用到
    * @returns {Object} 新的节点
    */
    each(node, context) {
        return node;
    },
    /**
     * 设置当前节点的子节点
     * 默认值为下面函数
     * @param {Object} node 
     * @param {Array} children 
     */
    setChildren(node, children) {
        node.children = children;
    }
};
```

#### 自定义使用

- 自定义节点属性

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

- 返回不一样的节点

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

### stringify()

```js
/**
 * 把书签树转换成书签字符串
 * @param {Array} tree 书签字树
 * @param {Object} options 选项，默认值：`defaultOptions.stringify`
 * @returns {Array} 书签字符串列表
 */
function stringify(tree, options) {
    return files;
}
```

需要注意的是，该函数是返回数组，而不是字符串。原因见下面参数说明。

#### 参数

- tree

书签树，对应于`parse()`返回的结构。

由于`parse()`支持多书签文件合并一起解释，`parse()`返回的数组，每个元素都代表一个书签树的根。因此`stringify()`的返回值也是数组，数组每元素都是一个书签文件字符串。

```js
const bookmark0 = readFileSync('bookmarks_2019_5_5.html', 'utf-8');
const bookmark1 = readFileSync('bookmarks_2023_5_9.html', 'utf-8');
// 转换成树
const tree = bookmark.parse(bookmark0 + bookmark1, {
    each(node, context) {
        // 转换成树之后，我们通常不关心属性的顺序，但是如果需要还原成字符串，就需要带上属性的顺序
        node.attributes = context.attributes;
        // 例如：{ name: 'github', href: 'https://github.com/', attributes:[{name: 'href', value: 'https://github.com/'}] }
        return node;
    }
});
// 还原成字符串
const files = bookmark.stringify(tree);

files.length === tree.length;
// true
files[0] === bookmark0;
// true
files[1] === bookmark1;
// true
```
如果书签名带有`&amp`等HTML转义序列，上面例子会出现`files[0]`不等于`bookmark0`，但是不影响使用。

- options

选项，下面是全部属性。

```js
const options = {
    /**
     * 每个节点的回调函数
     * 默认值为下面函数
     * @param {Array} node 书签树节点
     * @param {Array} parentPath 父节点集合，例如：`[node.parent.parent, node.parent]`
     * @returns {Object} 返回这个对象：`{ name, attributes, children }`
     * @property {number} name 标签名。必须
     * @property {number} attributes 属性列表，数组每个元素为：`{ name, value }`。必须
     * @property {number} [children] 如果children为数组，会转换成`<H3>`标签，不管数组有没有元素；反之转换成`<A>`标签。可选
     */
    each(node, parentPath) {
        return node;
    },
    // 换行符。在 Node.js 环境下，默认值为`os.EOL`；在浏览器环境下，默认值为'\n'。
    eol: '\n'
};
```

#### 自定义使用

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

### defaultOptions

默认选项。

```js
const defaultOptions = {
    // parse() 默认选项
    parse: {},
    // stringify() 默认选项
    stringify: {}
};
```

如果你希望自定义配置之后，仍然保持系统默认特性，可以这样处理。

```js
bookmark.parse(string, {
    each(node, context) {
        node.dearFather = lodash.last(context.parentPath);
        return bookmark.defaultOptions.parse(node, context);
    }
});
```

## 测试

### Node.js

```sh
npm test
```

### 浏览器

```sh
npm start
```
打开网页：http://localhost:3000/test/browser

## 从v1迁移到v2

v2版本已经重构，并且API并不复杂，建议重新阅读文档。

- 引用的文件变更，需要区分浏览器模式和Node.js模式
- 入口变更，现在模块会导出`{ parse, stringify, defaultOptions }`
- 废除选项`name`、`split`，使用`each`代替
- 废除选项`children`，使用`setChildren`代替

## 许可证

[MIT](LICENSE)