import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { ChangeDetails, ChangeItems } from '@bohr/changelogger/questioner/storer/deafult-contents.constant';
import { Storer } from '@bohr/changelogger/questioner/storer/storer.class';
import * as fs from 'fs-extra';
import * as moment from 'moment';
import * as path from 'path';

export class VersionPreparator extends PathsResolver {

  private packageInfo;
  private changeDetails: ChangeDetails;

  constructor(
    private changeItems: Array<ChangeItems>
  ) {
    super();
  }

  public make(): void {
    this.setPaths();
    this.getPackageInfo();
    this.setChangeDetails();
    this.passToStorer();
  }

  private getPackageInfo(): void {
    const finalPath = path.join(this.path, 'package.json');
    this.packageInfo = fs.readJSONSync(finalPath);
  }

  private setChangeDetails(): void {
    this.changeDetails = {
      version: this.packageInfo.version,
      date: moment().format('YYYY-MM-DD'),
      items: this.changeItems
    };
  }

  private passToStorer(): void {
    new Storer(this.changeDetails).storeChanges();
  }

}
