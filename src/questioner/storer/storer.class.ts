import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { ChangelogInitializer } from '@bohr/changelogger/questioner/storer/changelog-initializer.class';
import { ChangeDetails, ChangeLogger } from '@bohr/changelogger/questioner/storer/deafult-contents.constant';
import { MdMaker } from '@bohr/changelogger/renderers/mark-down/md-maker.class';
import * as fs from 'fs-extra';

export class Storer extends PathsResolver {

  private changeLogger: ChangeLogger;

  constructor(
    private changeDetails: ChangeDetails
  ) {
    super();
  }

  public storeChanges(): void {
    new ChangelogInitializer().init();
    this.setPaths();
    this.loadChangelogger();
    this.addChangeDetails();
    this.doStoreChanges();
    this.callRenderer();
  }

  private loadChangelogger(): void {
    this.changeLogger = fs.readJSONSync(this.pathToChangelogJson);
  }

  private addChangeDetails(): void {
    this.changeLogger.changes.unshift(this.changeDetails);
  }

  private doStoreChanges(): void {
    fs.writeJSONSync(this.pathToChangelogJson, this.changeLogger, { spaces: 2 });
  }

  private callRenderer(): void {
    new MdMaker().make();
  }

}
