import { UPDATE_TYPES } from '@bohr/changelogger/questioner/question-models/update-type/update-type.constant';
import * as inquirer from 'inquirer';

export function updateTypeSelector(): Promise<inquirer.Answers> {
  return inquirer.prompt(UPDATE_TYPES);
}
