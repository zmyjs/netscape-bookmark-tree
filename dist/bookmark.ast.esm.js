/**
 * netscape-bookmark-tree v1.0.1
 * Build 1564552303276
 * Zhu MaoYan
 */import parse5 from"parse5";function identity(a){return a}const regWrap=/<DL><p>([\s\S]+)<\/DL>/,defaultOption={each:identity,name:"name",children:"children",split:"_"};function getChild(a,b,c){let d=[];return a.forEach(function(a){if("dt"!==a.nodeName)return;let e={id:c+d.length};a.childNodes.forEach(function(a){const c=a.nodeName;"h3"===c||"a"===c?(e[b.name]=a.childNodes[0].value,a.attrs.forEach(function(a){e[a.name]=a.value})):"dl"===c&&(e[b.children]=getChild(a.childNodes,b,e.id+b.split))}),d.push(b.each(e))}),d}function astMode(a,b){const c=a.match(regWrap);if(c){const a=Object.assign({},defaultOption,b),d=c[1].replace(/<p>/g,""),e=parse5.parseFragment(d);return getChild(e.childNodes,a,"")}return c}export default astMode;
