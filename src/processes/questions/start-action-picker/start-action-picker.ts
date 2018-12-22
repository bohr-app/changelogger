import { Question } from 'inquirer';

export enum SUPPORTED_ACTIONS {
  stash = 'stash',
  newFeature = 'newfeature',
  closeFeature = 'closefeature',
  log = 'log',
  md = 'md'
}

export const START_ACTION_PICKER: Question = {
  type: 'list',
  name: 'action',
  message: 'What do you want to do?',
  choices: [
    { name: 'Stash new log entries for a future update', value: SUPPORTED_ACTIONS.stash },
    { name: 'Start a new feature', value: SUPPORTED_ACTIONS.newFeature },
    { name: 'Close current feature', value: SUPPORTED_ACTIONS.closeFeature },
    { name: 'Create a new release', value: SUPPORTED_ACTIONS.log },
    { name: 'Build the CHANGELOG.md file', value: SUPPORTED_ACTIONS.md }
  ]
};
