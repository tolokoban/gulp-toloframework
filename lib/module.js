var Through = require('through2');
var Path = require("path");
var FS = require("fs");


module.exports = function () {
    return Through.obj(function(chunck, encoding, callback) {
        /*
        if (file.isStream()) {
            self.emit('error', new PluginError(PLUGIN_NAME, "Streams aren't supported."));
            return cb();
        }
*/
        var error = null, output = chunck;
        try {
            output = transform(chunck);
        }
        catch (ex) {
            error = ex;
        }
        callback(error, chunck);
    });
};


function transform(chunck) {
    if (Path.extname(chunck.path) == '.js') {
        var basename = Path.basename(chunck.path);
        var stem = basename.substr(0, basename.length - 3);
        var moduleName = stem.toLowerCase();
        chunck.contents = Buffer.concat([
            new Buffer("window['#" + moduleName + "']=function(exports,module){"),
            chunck.contents,
            new Buffer('}')
        ]);
    }
    return chunck;
}
