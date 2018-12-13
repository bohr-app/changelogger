import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { Git } from 'git-interface';
import * as gitState from 'git-state';

export class FlowBase extends PathsResolver {

  protected currentBranch: string;
  protected git: Git;

  protected init(): void {
    this.setPaths();
    this.setGit();
    this.getCurrentBranch();
  }

  protected setGit(): void {
    this.git = new Git({
      dir: this.gitPath
    });
  }

  protected getCurrentBranch(): void {
    this.currentBranch = gitState.checkSync(this.gitPath).branch;
  }

}
