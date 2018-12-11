'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.NEXT_STEP = {
    type: 'list',
    name: 'next',
    message: 'What do you want to do next?',
    choices: [
        {
            name: 'Add another change',
            value: 'add'
        },
        {
            name: 'Save changes and update the CHANGELOG',
            value: 'finish'
        }
    ]
};