import { missingUpdateType } from '@bohr/changelogger/errors/missing-update-type.function';
import { StepsHandler } from '@bohr/changelogger/questioner/steps/steps-handler.class';
import { UpdateVersion } from '@bohr/changelogger/questioner/versioning/update-version.class';

export function questionerStarter(): void {
  const versioningResult = new UpdateVersion().do();

  if (!versioningResult)
    return missingUpdateType();

  new StepsHandler().start();
}
