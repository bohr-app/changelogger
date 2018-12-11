'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var change_value_constant_1 = require('../question-models/change-adding/change-value.constant');
var log_type_constant_1 = require('../question-models/change-adding/log-type.constant');
var inquirer = require('inquirer');
function changeAdder() {
    return inquirer.prompt([
        log_type_constant_1.LOG_TYPES,
        change_value_constant_1.CHANGE_VALUE
    ]);
}
exports.changeAdder = changeAdder;