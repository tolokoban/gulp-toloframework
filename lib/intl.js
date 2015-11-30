var Template = require("./template");
var Through = require('through2');
var Path = require("path");
var FS = require("fs");


module.exports = function () {
    return Through.obj(function(chunck, encoding, callback) {
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
        var iniPath = chunck.path.substr(0, chunck.path.length - 3) + '.ini';
        if (!FS.existsSync(iniPath)) return chunck;
        var intlBuff = parseIniFile(iniPath);
        chunck.contents = Buffer.concat([intlBuff, chunck.contents]);
    }
    return chunck;
}


function splitIfNeeded(txt) {
    // Transformer tous les "\n" en sauts de lignes.
    var parts = txt.split("\\");
    if (parts.length > 0) {
        parts.forEach(
            function(itm, idx) {
                if (idx > 0) {
                    var c = itm.substr(0, 1);
                    if (c == 'n') {
                        txt += "\n";
                    } else {
                        txt += "\\" + c;
                    }
                    txt += itm.substr(1);
                } else {
                    txt = itm;
                }
            }
        );
    }
    return txt;
}


function parseIniFile(file) {
    var content = FS.readFileSync(file).toString();
    var dic = {};
    var currentLang = null;
    content.split("\n").forEach(
        function(line, idx) {
            line = line.trim();
            if (line == '') return;
            var c = line.charAt(0);
            if (c == '#' || c == '/') return;
            var pos, lang, key, text;
            if (c == '[') {
                pos = line.indexOf(']');
                lang = line.substr(1, pos - 1).toLowerCase();
                currentLang = dic[lang];
                if (!currentLang) {
                    dic[lang] = {};
                    currentLang = dic[lang];
                }
                return;
            }
            if (c == '_' || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
                pos = line.indexOf(':');
                key = line.substr(0, pos).trim();
                text = line.substr(pos + 1).trim();
                currentLang[key] = splitIfNeeded(text);
            }
        }
    );

    var params = {dico: JSON.stringify(dic)};
    var out = Template.file("intl.js", params).out;
    var buff = new Buffer(out.length);
    buff.write(out);
    return buff;
};
