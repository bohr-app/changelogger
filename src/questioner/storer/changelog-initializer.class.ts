import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { DEFAULT_CONTENTS } from '@bohr/changelogger/questioner/storer/deafult-contents.constant';
import * as fs from 'fs-extra';

export class ChangelogInitializer extends PathsResolver {

  public init(): void {
    this.setPaths();

    if (this.checkIfExists())
      return;

    this.createJsonFile();
  }

  private checkIfExists(): boolean {
    try {
      fs.statSync(this.pathToChangelogJson);
      return true;
    } catch (err) {
      return false;
    }
  }

  private createJsonFile(): void {
    fs.writeJSONSync(this.pathToChangelogJson, DEFAULT_CONTENTS, { spaces: 2 });
  }

}
