import { DIRS } from '@bohr/changelogger/paths/dirs.constant';
import { ChangeDetails, ChangeItems } from '@bohr/changelogger/processes/new-release/storer/deafult-contents.constant';
import * as fs from 'fs-extra';
import * as moment from 'moment';
import * as path from 'path';

export class VersionPreparator {

  private packageInfo;
  private changeDetails: ChangeDetails;

  constructor(
    private changeItems: Array<ChangeItems>
  ) { }

  public make(): ChangeDetails {
    this.getPackageInfo();
    this.setChangeDetails();
    return this.changeDetails;
  }

  private getPackageInfo(): void {
    const finalPath = path.join(DIRS.path, 'package.json');
    this.packageInfo = fs.readJSONSync(finalPath);
  }

  private setChangeDetails(): void {
    this.changeDetails = {
      version: this.packageInfo.version,
      date: moment().format('YYYY-MM-DD'),
      items: this.changeItems
    };
  }

}
