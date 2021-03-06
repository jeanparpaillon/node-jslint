/*jslint unparam: true*/

(function () {
    'use strict';

    var util = require('util'),
        Transform = require('stream').Transform,
        fs = require('fs');

    function FileOpener() {
        Transform.call(this, {objectMode: true});
    }

    util.inherits(FileOpener, Transform);

    function FileOpener_transform(file, encoding, callback) {
        var stream = this;
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) {
                stream.emit('error', err);
                return;
            }

            stream.push({file: file, body: data});
            callback();
        });
    }

    /*jslint nomen:true*/
    FileOpener.prototype._transform = FileOpener_transform;

    module.exports = FileOpener;
}());
