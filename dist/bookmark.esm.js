/**
 * netscape-bookmark-tree v1.0.1
 * Build 1564552303276
 * Zhu MaoYan
 */function exec(a,b){let c,d=[];for(;c=a.exec(b);)d.push(c);return d}function identity(a){return a}const regWrap=/<DL><p>([\s\S]+)<\/DL>/,defaultOption={each:identity,name:"name",children:"children",split:"_"},reg=/(\s+)<DT><H3([\s\S]+?)>([\s\S]+?)<\/H3>\1<DL><p>([\s\S]+?)\1<\/DL><p>|<DT><A([\s\S]+?)>([\s\S]+?)<\/A>/g,regAttr=/(\S+)="(\S+)"/g;function getChild(a,b,c){return exec(reg,a).map(function(a,d){let e,f={id:c+d},g=a[4];return g?(e=a[2],f[b.name]=a[3],f[b.children]=getChild(g,b,f.id+b.split)):(e=a[5],f[b.name]=a[6]),exec(regAttr,e).map(function(a){const b=a[1].toLowerCase();f[b]=a[2]}),b.each(f,a)})}function regMode(a,b){const c=a.match(regWrap);if(c){const a=Object.assign({},defaultOption,b);return getChild(c[1],a,"")}return c}export default regMode;
