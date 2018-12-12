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
var changelog_initializer_class_1 = require('./changelog-initializer.class');
var fs = require('fs-extra');
var Storer = function (_super) {
    __extends(Storer, _super);
    function Storer(changeDetails) {
        var _this = _super.call(this) || this;
        _this.changeDetails = changeDetails;
        return _this;
    }
    Storer.prototype.storeChanges = function () {
        new changelog_initializer_class_1.ChangelogInitializer().init();
        this.setPaths();
        this.loadChangelogger();
        this.addChangeDetails();
        this.doStoreChanges();
        console.log('\nChanges stored in changelog.json');
    };
    Storer.prototype.loadChangelogger = function () {
        this.changeLogger = fs.readJSONSync(this.pathToChangelogJson);
    };
    Storer.prototype.addChangeDetails = function () {
        this.changeLogger.changes.unshift(this.changeDetails);
    };
    Storer.prototype.doStoreChanges = function () {
        fs.writeJSONSync(this.pathToChangelogJson, this.changeLogger, { spaces: 2 });
    };
    return Storer;
}(paths_resolver_class_1.PathsResolver);
exports.Storer = Storer;