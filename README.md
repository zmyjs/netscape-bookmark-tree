# NETSCAPE-Bookmark-tree

[![npm](https://img.shields.io/npm/v/netscape-bookmark-tree.svg?color=%23CB3837)](https://www.npmjs.com/package/netscape-bookmark-tree)

把**NETSCAPE-Bookmark-file-1**格式书签转换成**JavaScript**树形数据（数组）。

[English](README.md)
[示例](https://kobezhu.github.io/netscape-bookmark-tree/example)

## 安装

一般情况下，通过NPM安装：

```sh
npm install netscape-bookmark-tree
```

在NPM包的**dist/**目录包含多种构建版本，它们区别如下：

- umd – CommonJS、AMD模块、浏览器直接引用；包的默认输出。
- esm – ES标准模块，可以通过`<script type=module>`和模块打包器使用。
- ast.cjs - 依赖**parse5**的CommonJS版本。
- ast.esm - 依赖**parse5**的ES模块版本。

## 使用

### Node.js

```sh
const fs = require('fs');
const bookmark = require('netscape-bookmark-tree');

let content = fs.readFileSync('bookmarks.html', 'utf8');
let tree = bookmark(content);

console.log(tree);
```

默认模块使用正则进行解释，如果你的书签文件被修改过（压缩、删减标签等），那么可能无法正常识别。
这个时候需要依赖 [parse5](https://github.com/inikulin/parse5) 解释 AST 进行精细的转换。
但是这样开销更大。最好不要直接改动书签文件，书签文件头部直接写明了哈。


使用如下：

1. 安装 parse5
```sh
npm install parse5
```

2. 使用 AST 版模块
```js
const bookmark = require('netscape-bookmark-tree/dist/bookmark.ast.cjs');
```
其他一样。

### 浏览器

通过全局变量`bookmark`使用。

## API

模块很简单，只导出一个函数，接收字符串返回数组。

```js
/**
 * @param {String} string 书签字符串
 * @param {Object} option 配置
 */
bookmark(string, option);
```

### 参数

1. string

NETSCAPE-Bookmark-file-1 格式书签字符串，Chrome、Firefox导出的书签就是这种格式，文件开头为：

```html
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
```

> [书签格式相关文档](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v=vs.85))

2. option

```js
{
    // 生成每个节点都会调用，返回新节点，函数签名：each(node, match)
    each: utils.identity,
    // 显示键名
    name: 'name',
    // 子节点键名
    children: 'children',
    // ID分割线
    split: '_'
}
```

### 返回

如果传入的字符串符合格式，会返回转换后的树形数据（嵌套的数组）。
如果不符合格式，返回`null`。

```json
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

## 许可证

[MIT](LICENSE)