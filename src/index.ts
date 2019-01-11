import { PathsResolver } from '@bohr/changelogger/libs/paths/paths-resolver.class';
import { ActionPicker } from '@bohr/changelogger/processes/action-picker/action-picker.class';

export function start(): void {
  new ActionPicker().get();
}

new PathsResolver().setPaths();
start();
