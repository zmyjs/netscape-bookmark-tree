"use strict";var e=require("parse5");const t={parseHTML:t=>e.parseFragment(t).childNodes,getTag:e=>e.nodeName,getName:e=>e.childNodes[0].value,addAttrs(e,t){t.attrs.forEach((function(t){e[t.name]=t.value}))}};module.exports=function(e,n){return function(e,t,n){n=Object.assign({each:(e,t,n,s)=>e,setChildren(e,t){e.children=t}},n);const s=t.replace(/^[\s\S]+<\/TITLE>|<DT>|<p>/g,""),a=function t(s,a){const r=a?a.id:Date.now(),c=[];return s.forEach((function(s){const i=e.getTag(s);function o(t){const i=c.length;let o={index:i,id:`${r}_${i}`,pid:r,name:e.getName(s)};e.addAttrs(o,s),o=n.each(o,a,t,s),c.push(o)}if("a"===i)o(!0);else if("h3"===i||"h1"===i)o(!1);else if("dl"===i){const e=c[c.length-1],a=t(s.childNodes,e);n.setChildren(e,a)}})),c}(e.parseHTML(s),null);return a}(t,e,n)};