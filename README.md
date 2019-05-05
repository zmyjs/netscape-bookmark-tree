# NETSCAPE-Bookmark-tree

把**NETSCAPE-Bookmark-file-1**格式书签转换成**JavaScript**树形数据（数组）。

## API

只有一个函数：

```
fn(
string,
{
    href: 'href',
    icon: 'icon',
    name: 'name',
    children: 'children',
    each: identity
}
);
```

## 示例

```
const fs = require("fs");
let content = fs.readFileSync('bookmarks.html', 'utf8');
let tree = nbTree(content);
console.log(tree);
```

[Demo](https://kobezhu.github.io/netscape-bookmark-tree/example)

## NETSCAPE-Bookmark-file-1 书签

Chrome 导出的书签就是这种格式，文件开头为：

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

## 转换后的树形数据

一个普通的**JavaScript**数组，每一个元素都是对象。

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