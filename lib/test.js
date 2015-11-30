var Template = require("./template");
var Through = require('through2');
var File = require("vinyl");
var Path = require("path");
var FS = require("fs");


module.exports = function () {
    return Through.obj(function(chunck, encoding, callback) {
        var error = null;
        try {
            transform.call(this, chunck);
        }
        catch (ex) {
            error = ex;
        }
        callback(error, chunck);
    });
};


function transform(chunck) {
    if (Path.extname(chunck.path) == '.js') {
        var iniPath = chunck.path.substr(0, chunck.path.length - 3) + '.ini';
        if (!FS.existsSync(iniPath)) return;
        var content = FS.readFileSync(iniPath).toString();
        this.push(new File({
            cwd: chunck.cwd,
            base: chunck.base,
            path: iniPath,
            contents: new Buffer(content)
        }));
    }
    return;
}

