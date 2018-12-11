'use strict';
var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, '__esModule', { value: true });
var paths_resolver_class_1 = require('../../paths/paths-resolver.class');
var deafult_contents_constant_1 = require('./deafult-contents.constant');
var fs = require('fs-extra');
var ChangelogInitializer = function (_super) {
    __extends(ChangelogInitializer, _super);
    function ChangelogInitializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangelogInitializer.prototype.init = function () {
        this.setPaths();
        if (this.checkIfExists())
            return;
        this.createJsonFile();
    };
    ChangelogInitializer.prototype.checkIfExists = function () {
        try {
            fs.statSync(this.pathToChangelogJson);
            return true;
        } catch (err) {
            return false;
        }
    };
    ChangelogInitializer.prototype.createJsonFile = function () {
        fs.writeJSONSync(this.pathToChangelogJson, deafult_contents_constant_1.DEFAULT_CONTENTS, { spaces: 2 });
    };
    return ChangelogInitializer;
}(paths_resolver_class_1.PathsResolver);
exports.ChangelogInitializer = ChangelogInitializer;