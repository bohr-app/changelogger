'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function noLogsProvided() {
    try {
        throw new Error();
    } catch (err) {
        console.error('ERROR: you must provide at least one update with a meaningful update message');
    }
}
exports.noLogsProvided = noLogsProvided;