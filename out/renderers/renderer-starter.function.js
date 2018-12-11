'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var md_maker_class_1 = require('./mark-down/md-maker.class');
function rendererStarter(type) {
    new md_maker_class_1.MdMaker().make();
}
exports.rendererStarter = rendererStarter;