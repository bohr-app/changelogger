import { Question } from 'inquirer';

export const ADD_TEMP_TO_RELEASE: Question = {
  type: 'list',
  name: 'choice',
  message: 'Temp logs found in changelog.json, add them to this release?',
  choices: [
    { name: 'Yes', value: 'yes' },
    { name: 'No', value: 'no' }
  ]
};
