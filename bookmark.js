/**
 * @file bookmark.js
 * @name netscape-bookmark-tree
 * @version 2.0.2 Build.1683632823036
 * @author ZMY
 * @license MIT
 */
import{parseFragment as e}from"parse5";const t={each(e,t){const n=(r=t.parentPath)[r.length-1],a=t.index;var r;return e.index=a,n?(e.id=`${n.id}_${a}`,e.pid=n.id):e.id=a.toString(),e},setChildren(e,t){e.children=t}};const n={parseHTML:t=>e(t).childNodes,getTag:e=>e.nodeName,getName:e=>e.childNodes[0].value,addAttrs(e,t){t.attrs.forEach((function(t){e[t.name]=t.value}))}};function a(e,a){return function(e,n,a){a=Object.assign({},t,a);const r=n.replace(/<!DOCTYPE [\s\S]+?<\/TITLE>|<DT>|<p>/g,""),s=function t(n,r){const s=[];return n.forEach((function(n){const c=e.getTag(n);function i(t){const c=s.length;let i={name:e.getName(n)};e.addAttrs(i,n);const o={parentPath:r,isLeaf:t,index:c,rawNode:n};i=a.each(i,o)||i,s.push(i)}if("a"===c)i(!0);else if("h3"===c||"h1"===c)i(!1);else if("dl"===c){const e=s[s.length-1],c=r.concat(e),i=t(n.childNodes,c);a.setChildren(e,i)}})),s}(e.parseHTML(r),[]);return s}(n,e,a)}export{a as default,t as defaultParseOptions,a as parse};
