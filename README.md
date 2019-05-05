# NETSCAPE-Bookmark-tree

把 NETSCAPE-Bookmark-file-1 格式书签转换成 js 树形数据（数组）。

## NETSCAPE-Bookmark-file-1 书签
```
<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
```

## 转换后的树形数据

```
[
    {
        name: 'dir',
        children: [
            { name: 'node-1', icon: 'xxx', href: 'www.xxx.com' },
            { name: 'node-2', icon: 'xxx', href: 'www.xxx.com' }
        ]
    }
]
```

## api

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