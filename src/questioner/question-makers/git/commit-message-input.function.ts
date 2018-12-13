import { COMMITT_MESSAGE } from '@bohr/changelogger/questioner/question-models/git/commit-message.constant';
import * as inquirer from 'inquirer';

export function commitMessageInput(): Promise<inquirer.Answers> {
  return inquirer.prompt(COMMITT_MESSAGE);
}
