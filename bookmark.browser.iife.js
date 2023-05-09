/**
 * @file bookmark.browser.iife.js
 * @name netscape-bookmark-tree
 * @version 2.0.2 Build.1683632823036
 * @author ZMY
 * @license MIT
 */
var bookmark=function(e){"use strict";const t={each(e,t){const n=(a=t.parentPath)[a.length-1],r=t.index;var a;return e.index=r,n?(e.id=`${n.id}_${r}`,e.pid=n.id):e.id=r.toString(),e},setChildren(e,t){e.children=t}};const n={parseHTML(e){const t=document.createElement("div");return t.innerHTML=e,t.childNodes},getTag:e=>e.nodeName.toLowerCase(),getName:e=>e.textContent,getAttrs:e=>Array.from(e.attributes),addAttrs(e,t){const n=t.attributes;for(let t=0;t<n.length;t++){const r=n[t];e[r.name]=r.value}}};function r(e,r){return function(e,n,r){r=Object.assign({},t,r);const a=n.replace(/<!DOCTYPE [\s\S]+?<\/TITLE>|<DT>|<p>/g,""),o=function t(n,a){const o=[];return n.forEach((function(n){const s=e.getTag(n);function c(t){const s=o.length;let c={name:e.getName(n)};e.addAttrs(c,n);const i={parentPath:a,isLeaf:t,index:s,rawNode:n};c=r.each(c,i)||c,o.push(c)}if("a"===s)c(!0);else if("h3"===s||"h1"===s)c(!1);else if("dl"===s){const e=o[o.length-1],s=a.concat(e),c=t(n.childNodes,s);r.setChildren(e,c)}})),o}(e.parseHTML(a),[]);return o}(n,e,r)}return e.default=r,e.defaultOptions=t,e.parse=r,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
