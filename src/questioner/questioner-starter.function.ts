import { StepsHandler } from '@bohr/changelogger/questioner/steps/steps-handler.class';
import { UpdateVersion } from '@bohr/changelogger/questioner/versioning/update-version.class';

export async function questionerStarter(): Promise<void> {
  await new UpdateVersion().do();
  new StepsHandler().start();
}
