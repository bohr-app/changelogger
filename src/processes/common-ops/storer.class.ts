import { DIRS } from '@bohr/changelogger/paths/dirs.constant';
import { ChangelogInitializer } from '@bohr/changelogger/processes/new-release/storer/changelog-initializer.class';
import { ChangeLogger } from '@bohr/changelogger/processes/new-release/storer/deafult-contents.constant';
import * as fs from 'fs-extra';

export class Storer {

  protected changeLogger: ChangeLogger;

  protected init(): void {
    new ChangelogInitializer().init();
    this.loadChangelogger();
  }

  protected finish(): void {
    this.doStoreChanges();
    console.log('\nChanges stored in changelog.json');
  }

  private loadChangelogger(): void {
    this.changeLogger = fs.readJSONSync(DIRS.pathToChangelogJson);
  }

  private doStoreChanges(): void {
    fs.writeJSONSync(DIRS.pathToChangelogJson, this.changeLogger, { spaces: 2 });
  }

}
