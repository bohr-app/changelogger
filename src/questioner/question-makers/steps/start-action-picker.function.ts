import { START_ACTION_PICKER } from '@bohr/changelogger/questioner/question-models/start-action-picker/start-action-picker';
import * as inquirer from 'inquirer';

export async function startActionPicker(): Promise<inquirer.Answers> {
  return inquirer.prompt(START_ACTION_PICKER);
}
