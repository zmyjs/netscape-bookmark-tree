/**
 * netscape-bookmark-tree v1.0.0
 * Build 1560421941485
 * Zhu MaoYan
 */'use strict';function _interopDefault(a){return a&&"object"==typeof a&&"default"in a?a["default"]:a}var parse5=_interopDefault(require("parse5"));function identity(a){return a}const regWrap=/<DL><p>([\s\S]+)<\/DL>/,defaultOption={each:identity,name:"name",children:"children",split:"_"};function getChild(a,b,c){let d=[];return a.forEach(function(a){if("dt"!==a.nodeName)return;let e={id:c+d.length};a.childNodes.forEach(function(a){const c=a.nodeName;"h3"===c||"a"===c?(e[b.name]=a.childNodes[0].value,a.attrs.forEach(function(a){e[a.name]=a.value})):"dl"===c&&(e[b.children]=getChild(a.childNodes,b,e.id+b.split))}),d.push(b.each(e))}),d}function astMode(a,b){const c=a.match(regWrap);if(c){const a=Object.assign({},defaultOption,b),d=c[1].replace(/<p>/g,""),e=parse5.parseFragment(d);return getChild(e.childNodes,a,"")}return c}module.exports=astMode;
