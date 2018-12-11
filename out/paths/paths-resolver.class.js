'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var filenames_constant_1 = require('../questioner/storer/filenames.constant');
var path = require('path');
var PathsResolver = function () {
    function PathsResolver() {
    }
    PathsResolver.prototype.setPaths = function () {
        this.setPath();
        this.setJsonPath();
        this.setMdPath();
    };
    PathsResolver.prototype.setPath = function () {
        this.path = process.env.TESTING ? process.cwd() + '/testfiles' : process.cwd();
    };
    PathsResolver.prototype.setJsonPath = function () {
        this.pathToChangelogJson = path.join(this.path, filenames_constant_1.JSON_FILE_NAME);
    };
    PathsResolver.prototype.setMdPath = function () {
        this.pathToChangelogMD = path.join(this.path, filenames_constant_1.MD_FILE_NAME);
    };
    return PathsResolver;
}();
exports.PathsResolver = PathsResolver;