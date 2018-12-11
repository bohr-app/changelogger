import { Question } from 'inquirer';

export const START_ACTION_PICKER: Question = {
  type: 'list',
  name: 'action',
  message: 'What do you want to do?',
  choices: [
    { name: 'Make a new changelog entry', value: 'log' },
    { name: 'Build the CHANGELOG.md file', value: 'md' }
  ]
};
