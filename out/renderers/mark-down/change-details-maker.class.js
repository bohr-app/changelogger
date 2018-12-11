'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var change_items_maker_class_1 = require('./change-items-maker.class');
var ChangeDetailsMaker = function () {
    function ChangeDetailsMaker(changeDetails) {
        this.changeDetails = changeDetails;
        this.rendered = '';
    }
    ChangeDetailsMaker.prototype.make = function () {
        this.addTitle();
        this.handleChangeItems('added');
        this.handleChangeItems('changed');
        this.handleChangeItems('deprecated');
        this.handleChangeItems('fixed');
        this.handleChangeItems('removed');
        this.handleChangeItems('security');
        return this.rendered;
    };
    ChangeDetailsMaker.prototype.addTitle = function () {
        this.rendered += '## [' + this.changeDetails.version + '] - ' + this.changeDetails.date + '\n';
    };
    ChangeDetailsMaker.prototype.handleChangeItems = function (scope) {
        var scopedItems = this.changeDetails.items.filter(function (changeItem) {
            return changeItem.type === scope;
        });
        if (scopedItems.length)
            this.addRenderedChangeItems(scope, scopedItems);
    };
    ChangeDetailsMaker.prototype.addRenderedChangeItems = function (scope, changeItems) {
        this.rendered += new change_items_maker_class_1.ChangeItemsMaker(scope, changeItems).make();
    };
    return ChangeDetailsMaker;
}();
exports.ChangeDetailsMaker = ChangeDetailsMaker;