import { NEXT_STEP } from '@bohr/changelogger/questioner/question-models/change-adding/next-step-constant';
import * as inquirer from 'inquirer';

export async function nextStep(): Promise<inquirer.Answers> {
  return inquirer.prompt([NEXT_STEP]);
}
