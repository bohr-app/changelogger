'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var cmd = require('node-cmd');
var yargs_1 = require('yargs');
var UpdateVersion = function () {
    function UpdateVersion() {
        this.baseCommand = 'npm --no-git-tag-version version ';
    }
    UpdateVersion.prototype.do = function () {
        this.getUpdateType();
        if (!this.updateType)
            return false;
        console.log('Update type: ' + this.updateType + '\n');
        if (!process.env.TESTING)
            this.doUpdate();
        return true;
    };
    UpdateVersion.prototype.getUpdateType = function () {
        this.updateType = yargs_1.argv.p ? 'patch' : yargs_1.argv.f ? 'minor' : yargs_1.argv.m ? 'major' : undefined;
    };
    UpdateVersion.prototype.doUpdate = function () {
        cmd.run('' + this.baseCommand + this.updateType);
    };
    return UpdateVersion;
}();
exports.UpdateVersion = UpdateVersion;