"use strict";var e=require("parse5");function n(e){return e}function t(n){return e.parseFragment(n).childNodes}module.exports=function(e,i){return function(e,t,i){i=Object.assign({nameKey:"name",childrenKey:"children",idKey:"id",idSplit:"_",each:n},i);const c=function e(n,t){const c=[];return n.forEach((function(n){const r=n.nodeName;if("a"===r||"h3"===r||"h1"===r){const e=`${t.id}${i.idSplit}${c.length}`,r={[i.idKey]:e};n.attrs.forEach((function(e){r[e.name]=e.value})),r[i.nameKey]=n.childNodes[0].value,i.each(r),c.push(r)}else if("dl"===r){const t=c[c.length-1];t[i.childrenKey]=e(n.childNodes,t)}})),c}(e(t.replace(/^[\s\S]+<\/TITLE>|<DT>|<p>/g,"")),{id:""});return c}(t,e,i)};
