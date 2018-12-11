import { CHANGE_VALUE } from '@bohr/changelogger/questioner/question-models/change-adding/change-value.constant';
import { LOG_TYPES } from '@bohr/changelogger/questioner/question-models/change-adding/log-type.constant';
import * as inquirer from 'inquirer';

export function changeAdder(): Promise<inquirer.Answers> {
  return inquirer.prompt([LOG_TYPES, CHANGE_VALUE]);
}
