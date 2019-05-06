# NETSCAPE-Bookmark-tree

把**NETSCAPE-Bookmark-file-1**格式书签转换成**JavaScript**树形数据（数组）。

[Demo](https://kobezhu.github.io/netscape-bookmark-tree/example)

## 起步

```
const fs = require('fs');
const bookmark = require('../dist/netscape-bookmark-tree.cjs');

let content = fs.readFileSync('bookmarks.html', 'utf8');
let tree = bookmark(content);

console.log(tree);
```

## API

只有一个函数，函数返回数组。

```
/**
 * @param {String} string 书签的文本
 * @param {Object} option 配置选项
 */
bookmark(string, option);
```

### 参数

1. string

NETSCAPE-Bookmark-file-1 格式书签字符串，Chrome、Firefox导出的书签就是这种格式，文件开头为：

```
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
```

格式相关文档：

https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/aa753582(v=vs.85)

2. option

默认值：
```
{
    // 显示键名
    name: 'name',
    // 子节点键名
    children: 'children',
    // 每个节点都会调用该函数，必须返回节点对象，函数签名：each(node, match)
    each: utils.identity
}
```


### 返回

如果传入的字符串符合格式，会返回转换后的树形数据，一个普通的**JavaScript**数组，每一个元素都是对象。

如果不符合格式，返回`null`。

```
[
    {
        "name": "root",
        "children": [
            {
                "name": "书签栏",
                "children": [
                    {
                        "href": "https://github.com/",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "GitHub"
                    },
                    {
                        "href": "https://gitlab.com/",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "GitLab"
                    },
                    {
                        "href": "https://gitee.com/",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "码云"
                    },
                    {
                        "href": "https://developer.mozilla.org/zh-CN/docs/Web/API",
                        "icon": "data:image/png;base64,iVB...",
                        "name": "MDN"
                    }
                ]
            }
        ]
    }
]
```