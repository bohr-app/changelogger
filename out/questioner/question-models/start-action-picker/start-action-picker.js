'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.START_ACTION_PICKER = {
    type: 'list',
    name: 'action',
    message: 'What do you want to do?',
    choices: [
        {
            name: 'Make a new changelog entry',
            value: 'log'
        },
        {
            name: 'Build the CHANGELOG.md file',
            value: 'md'
        }
    ]
};