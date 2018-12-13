import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';
import * as cmd from 'node-cmd';
import { promisify } from 'util';

export class FeatureCloser extends FlowBase {

  public async close(): Promise<void> {
    this.init();

    if (!this.isCurrentAFeature())
      return;

    // await this.checkoutToDevelop();
    // await this.mergeFeatureOnDevelop();
    // await this.deleteFeatureBranch();
    await this.getRemoteBranchList();
  }

  private isCurrentAFeature(): boolean {
    return this.currentBranch.startsWith('feature/');
  }

  private async checkoutToDevelop(): Promise<void> {
    await this.git.checkout('develop');
  }

  private async mergeFeatureOnDevelop(): Promise<void> {
    await promisify(cmd.get)(`git merge ${this.currentBranch}`);
  }

  private async deleteFeatureBranch(): Promise<void> {
    await this.git.removeLocalBranch(this.currentBranch);
  }

  private async getRemoteBranchList(): Promise<void> {
    const branches = await this.git.getRemoteBranchList();
    console.log('branches', branches);
  }

}
