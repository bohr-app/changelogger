import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';
import { Committer } from '@bohr/changelogger/git-manager/committer.class';
import * as cmd from 'node-cmd';
import { promisify } from 'util';

export class FeatureCloser extends FlowBase {

  public async close(): Promise<void> {
    this.init();
    if (!this.isCurrentAFeature())
      return;

    await this.checkoutToDevelop();
    await this.mergeFeatureOnDevelop();
    await this.callCommitter();
    // await this.deleteFeatureBranch();
  }

  private isCurrentAFeature(): boolean {
    return this.currentBranch.startsWith('feature/');
  }

  private async checkoutToDevelop(): Promise<void> {
    await this.git.checkout('develop');
  }

  private async mergeFeatureOnDevelop(): Promise<void> {
    try {
      await promisify(cmd.get)(`git merge ${this.currentBranch}`);
    } catch (err) {
      console.error('Err merge', err);
    }
  }

  private async rebase(): Promise<void> {
    await promisify(cmd.get)(`git rebase ${this.currentBranch} develop`);
  }

  private async callCommitter(): Promise<void> {
    const message = `Merged branch ${this.currentBranch} into develop`;
    try {
      await new Committer(undefined, message).commit();
    } catch (err) {
      console.error('Err 1', err);
    }
  }

  private async deleteFeatureBranch(): Promise<void> {
    try {
      await this.git.removeLocalBranch(this.currentBranch);
    } catch (err) {
      console.error('Err 2', err);
    }

  }

}
