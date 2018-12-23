import { DIRS } from '@bohr/changelogger/libs/paths/dirs.constant';
import { Loader } from '@bohr/changelogger/processes/common-ops/loader.class';
import { ChangelogInitializer } from '@bohr/changelogger/processes/new-release/storer/changelog-initializer.class';
import * as fs from 'fs-extra';

export class Storer extends Loader {

  protected init(): void {
    new ChangelogInitializer().init();
    this.loadChangelogger();
  }

  protected finish(): void {
    this.doStoreChanges();
    console.log('\nChanges stored in changelog.json');
  }

  protected doStoreChanges(): void {
    fs.writeJSONSync(DIRS.pathToChangelogJson, this.changeLogger, { spaces: 2 });
  }

}
