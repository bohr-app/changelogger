'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function missingUpdateType() {
    console.error('FATAL ERROR: You must specify the update type by passing either: --p (patch), for patch; --f (feature), for minor; -m (major), for major\n');
}
exports.missingUpdateType = missingUpdateType;