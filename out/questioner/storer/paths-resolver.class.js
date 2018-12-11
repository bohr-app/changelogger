'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var filenames_constant_1 = require('./filenames.constant');
var path = require('path');
var PathsResolver = function () {
    function PathsResolver() {
    }
    PathsResolver.prototype.setPaths = function () {
        this.path = process.env.TESTING ? process.cwd() + '/testfiles' : process.cwd();
        this.pathToChangelogJson = path.join(this.path, filenames_constant_1.JSON_FILE_NAME);
    };
    return PathsResolver;
}();
exports.PathsResolver = PathsResolver;