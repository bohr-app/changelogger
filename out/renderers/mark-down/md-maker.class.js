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
var change_details_maker_class_1 = require('./change-details-maker.class');
var renderers_constant_1 = require('../renderers.constant');
var fs = require('fs-extra');
var MdMaker = function (_super) {
    __extends(MdMaker, _super);
    function MdMaker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rendered = '';
        return _this;
    }
    MdMaker.prototype.make = function () {
        this.setPaths();
        this.loadJson();
        this.addTitle();
        this.addDescription();
        this.addSeparator();
        this.handleChanges();
        this.storeRendered();
        console.log('CHANGELOG.md updated.\n');
    };
    MdMaker.prototype.loadJson = function () {
        this.jsonData = fs.readJSONSync(this.pathToChangelogJson);
    };
    MdMaker.prototype.addTitle = function () {
        this.rendered += '# ' + this.jsonData.title + '\n';
    };
    MdMaker.prototype.addDescription = function () {
        this.rendered += this.jsonData.description + '\n';
    };
    MdMaker.prototype.addSeparator = function () {
        this.rendered += '\n' + renderers_constant_1.SEPARATOR + '\n\n';
    };
    MdMaker.prototype.handleChanges = function () {
        var _this = this;
        this.jsonData.changes.forEach(function (changeDetails) {
            return _this.addRenderedChange(changeDetails);
        });
    };
    MdMaker.prototype.addRenderedChange = function (changeDetails) {
        this.rendered += '' + new change_details_maker_class_1.ChangeDetailsMaker(changeDetails).make();
    };
    MdMaker.prototype.storeRendered = function () {
        fs.writeFileSync(this.pathToChangelogMD, this.rendered);
    };
    return MdMaker;
}(paths_resolver_class_1.PathsResolver);
exports.MdMaker = MdMaker;