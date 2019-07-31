/**
 * netscape-bookmark-tree v1.0.1
 * Build 1564552303276
 * Zhu MaoYan
 */(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):(a=a||self,a.bookmark=b())})(this,function(){'use strict';function a(a,b){let c,d=[];for(;c=a.exec(b);)d.push(c);return d}function b(c,d,g){return a(e,c).map(function(c,e){let h,i={id:g+e},j=c[4];return j?(h=c[2],i[d.name]=c[3],i[d.children]=b(j,d,i.id+d.split)):(h=c[5],i[d.name]=c[6]),a(f,h).map(function(a){const b=a[1].toLowerCase();i[b]=a[2]}),d.each(i,c)})}const c=/<DL><p>([\s\S]+)<\/DL>/,d={each:function(a){return a},name:"name",children:"children",split:"_"},e=/(\s+)<DT><H3([\s\S]+?)>([\s\S]+?)<\/H3>\1<DL><p>([\s\S]+?)\1<\/DL><p>|<DT><A([\s\S]+?)>([\s\S]+?)<\/A>/g,f=/(\S+)="(\S+)"/g;return function(a,e){const f=a.match(c);if(f){const a=Object.assign({},d,e);return b(f[1],a,"")}return f}});
