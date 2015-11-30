var FS = require("fs");


module.exports = function (path) {
    var counter = 0;
    var pathAR = path + ".ar";
    var data = [];
    if (FS.existsSync(pathAR)) {
        try {
            data = JSON.parse(FS.readFileSync(pathAR).toString());
        }
        catch (ex) {
            data = [];
        }
    }

    return function(value) {
        var id = counter++;
        var ref = data[id];
        if (typeof ref === 'undefined') {
            // There is no reference value, take this one.
            data[id] = value;
            FS.writeFileSync(pathAR, JSON.stringify(data));
        } else {
            expect(value).toEqual(ref);
        }
    };
};
