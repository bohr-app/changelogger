import { BranchCloser } from '@bohr/changelogger/libs/git-manager/branch-closer.class';

export class ReleaseCloser {

  public async close(): Promise<void> {
    await this.mergeOnDevelop();
    await this.mergeOnMaster();
  }

  private async mergeOnDevelop(): Promise<void> {
    await new BranchCloser('release', 'develop', false);
  }

  private async mergeOnMaster(): Promise<void> {
    await new BranchCloser('release', 'master', true);
  }

}
