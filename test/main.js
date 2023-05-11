export default function (bookmark, assert, text, afterParse, afterStringify) {
    const eol = '\n';

    const info = {
        aLength: 0,
        hLength: 0,
        text1: text.replace(/\r\n/g, eol)
    };

    const tree = bookmark.parse(text, {
        each(node, context) {
            if (context.isLeaf) {
                info.aLength++;
            } else {
                info.hLength++;
            }
            node.attributes = context.attributes;
            return bookmark.defaultOptions.parse.each(node, context);
        }
    });

    info.text2 = bookmark.stringify(tree, { eol })[0];

    describe('parse', function () {
        it('验证根节点', function () {
            assert.equal(Array.isArray(tree) && tree.length > 0, true);
        });

        it('叶子节点数量', function () {
            const m = text.match(/<\/A>/g);
            assert.equal(info.aLength, m.length);
        });

        it('非叶子节点数量', function () {
            const m = text.match(/<\/H3>|<\/H1>/g);
            assert.equal(info.hLength, m.length);
        });

        afterParse(tree, info);
    });

    describe('stringify', function () {
        it('转换成字符串并与源字符串对比', function () {
            assert.equal(info.text1, info.text2);
        });

        afterStringify(tree, info);
    });
}