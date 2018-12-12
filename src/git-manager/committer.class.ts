import { FilesToCommit } from '@bohr/changelogger/git-manager/uncommitted-checker.class';
import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { commitMessageInput } from '@bohr/changelogger/questioner/git/commit-message-input.function';
import { Git } from 'git-interface';
import * as cmd from 'node-cmd';
import { promisify } from 'util';

export class Committer extends PathsResolver {

  private git: Git;

  constructor(
    private files?: FilesToCommit,
    private committMessage?: string
  ) {
    super();
  }

  public async commit(): Promise<void> {
    if (!this.committMessage)
      console.log('\nSome files need to be committed before proceeding\n');
    this.setPaths();
    this.setGit();

    await this.addFiles();

    if (!this.committMessage)
      await this.askMessage();

    console.log('\nRunning commit and push commands. Please wait.\n');

    await this.commitFiles();
    await this.push();
  }

  private setGit(): void {
    this.git = new Git({
      dir: this.gitPath
    });
  }

  private async addFiles(): Promise<void> {
    await this.git.add();
  }

  private async askMessage(): Promise<void> {
    const answer = await commitMessageInput();
    this.committMessage = answer['message'];
  }

  private async commitFiles(): Promise<void> {
    try {
      await await promisify(cmd.get)(`git commit -m "${this.committMessage}"`);
    } catch (err) {
      console.log('Error 1', err);
    }
  }

  private async push(): Promise<void> {
    try {
      await this.git.push();
    } catch (err) {
      console.log('error 2', err);
    }
  }

}
