var AR = require("./antiregressor")(__filename);

var html2tree = require("../lib/tfw.html2tree")({
    Fatal: require("../mock/fatal"),
    Tree: require("../lib/tree.const")
});



describe('[tfw.html2tree]', function () {
    describe('should deal with simple text', function () {
        [
            'Hello world!',
            "L'&eacute;t&eacute;",
            ''
        ].forEach(function (txt) {
            it('as "' + txt + '"', function () {
                AR(html2tree(txt));
            });
        });
    });
});
