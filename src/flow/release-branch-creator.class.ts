import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';
import * as fs from 'fs-extra';
export class ReleaseBranchCreator extends FlowBase {

  private packageInfo;
  private branchName: string;

  public async create(): Promise<void> {
    this.init();
    this.getPackageInfo();
    this.setBranchName();
    console.log(`\Creating branch ${this.branchName}\n`);
    await this.createReleaseVersion();
    await this.pushReleaseBranch();
  }

  private getPackageInfo(): void {
    this.packageInfo = fs.readJSONSync(this.packageJsonPath);
  }

  private setBranchName(): void {
    this.branchName = `release/${this.packageInfo.version}`;
  }

  private async createReleaseVersion(): Promise<void> {
    await this.git.createBranch(this.branchName);
  }

  private async pushReleaseBranch(): Promise<void> {
    await this.git.push();
  }

}
