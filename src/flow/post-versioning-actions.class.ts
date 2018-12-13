import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';
import * as fs from 'fs-extra';
export class PostVersioningActions extends FlowBase {

  private packageInfo;

  public async handle(): Promise<void> {
    this.init();
    this.getPackageInfo();
    await this.createReleaseVersion();
  }

  private getPackageInfo(): void {
    this.packageInfo = fs.readJSONSync(this.packageJsonPath);
  }

  private async createReleaseVersion(): Promise<void> {
    await this.git.createBranch(`release/${this.packageInfo.version}`);
  }

}
