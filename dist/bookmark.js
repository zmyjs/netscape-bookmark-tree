import{parseFragment as e}from"parse5";const t={parseHTML:t=>e(t).childNodes,getTag:e=>e.nodeName,getName:e=>e.childNodes[0].value,addAttrs(e,t){t.attrs.forEach((function(t){e[t.name]=t.value}))}};function n(e,n){return function(e,t,n){n=Object.assign({each:(e,t,n,a)=>e,setChildren(e,t){e.children=t}},n);const a=t.replace(/^[\s\S]+<\/TITLE>|<DT>|<p>/g,""),s=function t(a,s){const c=s?s.id:Date.now(),o=[];return a.forEach((function(a){const i=e.getTag(a);function r(t){const i=o.length;let r={index:i,id:`${c}_${i}`,pid:c,name:e.getName(a)};e.addAttrs(r,a),r=n.each(r,s,t,a),o.push(r)}if("a"===i)r(!0);else if("h3"===i||"h1"===i)r(!1);else if("dl"===i){const e=o[o.length-1],s=t(a.childNodes,e);n.setChildren(e,s)}})),o}(e.parseHTML(a),null);return s}(t,e,n)}export{n as default};
