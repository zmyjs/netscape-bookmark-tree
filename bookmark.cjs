/**
 * @file bookmark.cjs
 * @name netscape-bookmark-tree
 * @version 2.0.2 Build.1683632823036
 * @author ZMY
 * @license MIT
 */
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("parse5");const t={each(e,t){const n=(a=t.parentPath)[a.length-1],r=t.index;var a;return e.index=r,n?(e.id=`${n.id}_${r}`,e.pid=n.id):e.id=r.toString(),e},setChildren(e,t){e.children=t}};const n={parseHTML:t=>e.parseFragment(t).childNodes,getTag:e=>e.nodeName,getName:e=>e.childNodes[0].value,addAttrs(e,t){t.attrs.forEach((function(t){e[t.name]=t.value}))}};function r(e,r){return function(e,n,r){r=Object.assign({},t,r);const a=n.replace(/<!DOCTYPE [\s\S]+?<\/TITLE>|<DT>|<p>/g,""),s=function t(n,a){const s=[];return n.forEach((function(n){const o=e.getTag(n);function i(t){const o=s.length;let i={name:e.getName(n)};e.addAttrs(i,n);const c={parentPath:a,isLeaf:t,index:o,rawNode:n};i=r.each(i,c)||i,s.push(i)}if("a"===o)i(!0);else if("h3"===o||"h1"===o)i(!1);else if("dl"===o){const e=s[s.length-1],o=a.concat(e),i=t(n.childNodes,o);r.setChildren(e,i)}})),s}(e.parseHTML(a),[]);return s}(n,e,r)}exports.default=r,exports.defaultOptions=t,exports.parse=r;
