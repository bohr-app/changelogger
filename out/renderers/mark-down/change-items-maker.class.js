'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var ChangeItemsMaker = function () {
    function ChangeItemsMaker(scope, changeItems) {
        this.scope = scope;
        this.changeItems = changeItems;
        this.rendered = '';
    }
    ChangeItemsMaker.prototype.make = function () {
        this.addTitle();
        this.handleItems();
        return this.rendered;
    };
    ChangeItemsMaker.prototype.addTitle = function () {
        this.rendered += '### ' + (this.scope.charAt(0).toUpperCase() + this.scope.slice(1)) + '\n';
    };
    ChangeItemsMaker.prototype.handleItems = function () {
        var _this = this;
        this.changeItems.forEach(function (item) {
            return _this.addRenderedItem(item);
        });
        this.rendered += '\n';
    };
    ChangeItemsMaker.prototype.addRenderedItem = function (item) {
        this.rendered += '- ' + item.value;
        if (this.rendered.endsWith(';') || this.rendered.endsWith(','))
            this.rendered.substring(0, this.rendered.length - 1);
        if (!this.rendered.endsWith('.'))
            this.rendered += '.';
        this.rendered += '\n';
    };
    return ChangeItemsMaker;
}();
exports.ChangeItemsMaker = ChangeItemsMaker;