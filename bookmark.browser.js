/**
 * @file bookmark.browser.js
 * @name netscape-bookmark-tree
 * @version 2.0.1 Build.1683630484992
 * @author ZMY
 * @license MIT
 */
const t={each(t,e){const n=(a=e.parentPath)[a.length-1],r=e.index;var a;return t.index=r,n?(t.id=`${n.id}_${r}`,t.pid=n.id):t.id=r.toString(),t},setChildren(t,e){t.children=e}};const e={parseHTML(t){const e=document.createElement("div");return e.innerHTML=t,e.childNodes},getTag:t=>t.nodeName.toLowerCase(),getName:t=>t.textContent,getAttrs:t=>Array.from(t.attributes),addAttrs(t,e){const n=e.attributes;for(let e=0;e<n.length;e++){const r=n[e];t[r.name]=r.value}}};function n(n,r){return function(e,n,r){r=Object.assign({},t,r);const a=n.replace(/<!DOCTYPE [\s\S]+?<\/TITLE>|<DT>|<p>/g,""),s=function t(n,a){const s=[];return n.forEach((function(n){const o=e.getTag(n);function c(t){const o=s.length;let c={name:e.getName(n)};e.addAttrs(c,n);const i={parentPath:a,isLeaf:t,index:o,rawNode:n};c=r.each(c,i)||c,s.push(c)}if("a"===o)c(!0);else if("h3"===o||"h1"===o)c(!1);else if("dl"===o){const e=s[s.length-1],o=a.concat(e),c=t(n.childNodes,o);r.setChildren(e,c)}})),s}(e.parseHTML(a),[]);return s}(e,n,r)}export{n as default,t as defaultOptions,n as parse};
