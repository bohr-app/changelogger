import { DIRS } from '@bohr/changelogger/paths/dirs.constant';
import { DEFAULT_CONTENTS } from '@bohr/changelogger/processes/new-release/storer/deafult-contents.constant';
import * as fs from 'fs-extra';

export class ChangelogInitializer {

  public init(): void {

    if (this.checkIfExists())
      return;

    this.createJsonFile();
  }

  private checkIfExists(): boolean {
    try {
      fs.statSync(DIRS.pathToChangelogJson);
      return true;
    } catch (err) {
      return false;
    }
  }

  private createJsonFile(): void {
    fs.writeJSONSync(DIRS.pathToChangelogJson, DEFAULT_CONTENTS, { spaces: 2 });
  }

}