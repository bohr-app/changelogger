import { errorHandler } from '@bohr/changelogger/errors/error-handler.function';
import { fatalErrors } from '@bohr/changelogger/errors/errors.enum';
import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { Git } from 'git-interface';
import * as gitState from 'git-state';
import * as cmd from 'node-cmd';
import { promisify } from 'util';

export interface FilesToCommit {
  untracked: Array<string>;
  uncommitted: Array<string>;
}

export class UncommittedChecker extends PathsResolver {

  private isRepository: boolean;
  private git: Git;
  private filesToCommit: FilesToCommit = {
    untracked: [],
    uncommitted: []
  };

  public async exist(): Promise<FilesToCommit> {
    this.setPaths();
    this.isGit();

    if (!this.isRepository)
      errorHandler(fatalErrors.notARepository);

    this.setGit();
    await this.getUntracked();
    await this.getUncommitted();
    return this.filesToCommit;
  }

  private isGit(): void {
    this.isRepository = gitState.isGitSync(this.gitPath) as boolean;
  }

  private setGit(): void {
    this.git = new Git({
      dir: this.gitPath
    });
  }

  private async getUntracked(): Promise<void> {
    const untrackedString = await promisify(cmd.get)('git ls-files --others --exclude-standard');
    this.filesToCommit.untracked = untrackedString.split('\n').filter(filename => filename !== '');
  }

  private async getUncommitted(): Promise<void> {
    this.filesToCommit.uncommitted = await this.git.getUncommittedList();
  }

}
