import { StepsHandler } from '@bohr/changelogger/questioner/steps/steps-handler.class';
import { ChangeItems } from '@bohr/changelogger/questioner/storer/deafult-contents.constant';
import { Storer } from '@bohr/changelogger/questioner/storer/storer.class';
import { VersionPreparator } from '@bohr/changelogger/questioner/storer/version-preparator.class';
import { UpdateVersion } from '@bohr/changelogger/questioner/versioning/update-version.class';
import { MdMaker } from '@bohr/changelogger/renderers/mark-down/md-maker.class';

export async function questionerStarter(): Promise<void> {
  await new UpdateVersion().do();
  const newChanges = await new StepsHandler().start();
  const changeDetails = new VersionPreparator(newChanges as Array<ChangeItems>).make();
  new Storer(changeDetails).storeChanges();
  new MdMaker().make();
}
