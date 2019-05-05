import * as utils from './utils';

const regWrap = /<DL><p>([\s\S]+)<\/DL><p>/;
const reg = /(\s+)<DT><H3[\s\S]+?>([\s\S]+?)<\/H3>\1<DL><p>([\s\S]+?)\1<\/DL><p>|<DT><A[\s\S]+?HREF="(\S+)"[\s\S]+?ICON="(\S+)">([\s\S]+?)<\/A>/g;

function main(string, option) {
    return utils.exec(reg, string).map(function (match) {
        const childStr = match[3];
        let node = {
            id: match.index
        };

        if (childStr) {
            node[option.name] = match[2];
            node[option.children] = main(childStr, option);
        } else {
            node[option.href] = match[4];
            node[option.icon] = match[5];
            node[option.name] = match[6];
        }

        return option.each(node, match);
    });
}

export default function (str, opt) {
    let match = str.match(regWrap);
    if (!match) return match;

    let string = match[1],
        option = Object.assign({
            href: 'href',
            icon: 'icon',
            name: 'name',
            children: 'children',
            each: utils.identity
        }, opt);

    return main(string, option);
}