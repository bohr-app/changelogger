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
var fs = require('fs-extra');
var moment = require('moment');
var path = require('path');
var VersionPreparator = function (_super) {
    __extends(VersionPreparator, _super);
    function VersionPreparator(changeItems) {
        var _this = _super.call(this) || this;
        _this.changeItems = changeItems;
        return _this;
    }
    VersionPreparator.prototype.make = function () {
        this.setPaths();
        this.getPackageInfo();
        this.setChangeDetails();
        return this.changeDetails;
    };
    VersionPreparator.prototype.getPackageInfo = function () {
        var finalPath = path.join(this.path, 'package.json');
        this.packageInfo = fs.readJSONSync(finalPath);
    };
    VersionPreparator.prototype.setChangeDetails = function () {
        this.changeDetails = {
            version: this.packageInfo.version,
            date: moment().format('YYYY-MM-DD'),
            items: this.changeItems
        };
    };
    return VersionPreparator;
}(paths_resolver_class_1.PathsResolver);
exports.VersionPreparator = VersionPreparator;