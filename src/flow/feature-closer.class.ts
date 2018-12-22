import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';
import * as cmd from 'node-cmd';
import { promisify } from 'util';

export class FeatureCloser extends FlowBase {

  private remoteBranches: Array<string>;

  public async close(): Promise<void> {
    this.init();

    if (!this.isCurrentAFeature())
      return;

    console.log(`Closing branch ${this.currentBranch}\n`);

    await this.checkoutToDevelop();
    await this.mergeFeatureOnDevelop();
    await this.pushCurrent();
    await this.deleteFeatureBranch();
    await this.getRemoteBranchList();
    await this.remmoveRemote();
  }

  private isCurrentAFeature(): boolean {
    return this.currentBranch.startsWith('feature/');
  }

  private async mergeFeatureOnDevelop(): Promise<void> {
    await promisify(cmd.get)(`git merge ${this.currentBranch}`);
  }

  private async deleteFeatureBranch(): Promise<void> {
    await this.git.removeLocalBranch(this.currentBranch);
  }

  private async getRemoteBranchList(): Promise<void> {
    this.remoteBranches = await this.git.getRemoteBranchList() as Array<string>;
  }

  private async remmoveRemote(): Promise<void> {
    if (this.remoteBranches && this.remoteBranches.includes(this.currentBranch))
      await this.git.removeRemoteBranch(this.currentBranch);
  }

}
