export default function (bookmark, assert, text) {
    describe('测试返回结果', function () {
        let aNum = 0,
            hNum = 0;

        const tree = bookmark.parse(text, {
            each(node, context) {
                if (context.isLeaf) {
                    aNum++;
                } else {
                    hNum++;
                }
                
                return bookmark.defaultOptions.each(node, context);
            }
        });

        it('验证根节点', function () {
            assert.equal(Array.isArray(tree)
                && tree.length === 1
                && tree[0].name,
                'Bookmarks');
        });

        it('叶子节点数量', function () {
            const m = text.match(/<\/A>/g);
            assert.equal(aNum, m.length);
        });

        it('非叶子节点数量', function () {
            const m = text.match(/<\/H3>|<\/H1>/g);
            assert.equal(hNum, m.length);
        });
    });
}