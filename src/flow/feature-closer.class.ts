import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';
import { Committer } from '@bohr/changelogger/git-manager/committer.class';

export class FeatureCloser extends FlowBase {

  public async close(): Promise<void> {
    this.init();
    if (!this.isCurrentAFeature())
      return;

    await this.checkoutToDevelop();
    await this.mergeFeatureOnDevelop();
    await this.callCommitter();
    await this.deleteFeatureBranch();
  }

  private isCurrentAFeature(): boolean {
    return this.currentBranch.startsWith('feature/');
  }

  private async checkoutToDevelop(): Promise<void> {
    await this.git.checkout('develop');

  }

  private async mergeFeatureOnDevelop(): Promise<void> {
    await this.git.merge(this.currentBranch);
  }

  private async callCommitter(): Promise<void> {
    const message = `Merged branch ${this.currentBranch} into develop`;
    await new Committer(undefined, message).commit();
  }

  private async deleteFeatureBranch(): Promise<void> {
    await this.git.removeLocalBranch(this.currentBranch);

  }

}
