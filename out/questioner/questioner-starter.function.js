'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var missing_update_type_function_1 = require('../errors/missing-update-type.function');
var steps_handler_class_1 = require('./steps/steps-handler.class');
var update_version_class_1 = require('./versioning/update-version.class');
function questionerStarter() {
    var versioningResult = new update_version_class_1.UpdateVersion().do();
    if (!versioningResult)
        return missing_update_type_function_1.missingUpdateType();
    new steps_handler_class_1.StepsHandler().start();
}
exports.questionerStarter = questionerStarter;