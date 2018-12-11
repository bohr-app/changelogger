import { questionerStarter } from '@bohr/changelogger/questioner/questioner-starter.function';
import { startActionPicker } from '@bohr/changelogger/questioner/steps/start-action-picker.function';
import { rendererStarter } from '@bohr/changelogger/renderers/renderer-starter.function';

export async function start(): Promise<void> {
  const choice = await startActionPicker();
  if (choice.action === 'log')
    questionerStarter();
  else
    rendererStarter(choice.action);
}

start();
