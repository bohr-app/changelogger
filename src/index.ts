import { startActionPicker } from '@bohr/changelogger/questioner/question-makers/steps/start-action-picker.function';
import { QuestionerStarter } from '@bohr/changelogger/questioner/questioner-starter.class';
import { rendererStarter } from '@bohr/changelogger/renderers/renderer-starter.function';

export async function start(): Promise<void> {
  const choice = await startActionPicker();
  if (choice.action === 'log')
    new QuestionerStarter().init();
  else
    rendererStarter(choice.action);
}

start();
