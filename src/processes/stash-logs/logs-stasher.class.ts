import { Committer } from '@bohr/changelogger/git-manager/committer.class';
import { handleUncommittedChanges } from '@bohr/changelogger/processes/common-ops/handle-uncommitted-changes.function';
import { StepsHandler } from '@bohr/changelogger/processes/new-release/steps/steps-handler.class';
import { ChangeItems } from '@bohr/changelogger/processes/new-release/storer/deafult-contents.constant';
import { TempStorer } from '@bohr/changelogger/processes/stash-logs/temp-storer.class';
import { argv } from 'yargs';

export class LogsStasher {

  private newChanges: Array<ChangeItems>;

  public async init(): Promise<void> {
    if (!argv.sg)
      await handleUncommittedChanges();

    await this.getChanges();

    this.storeTempChanges();

    await this.commitStash();

  }

  private async getChanges(): Promise<void> {
    this.newChanges = await new StepsHandler().start() as Array<ChangeItems>;
  }

  private storeTempChanges(): void {
    new TempStorer(this.newChanges).store();
  }

  private async commitStash(): Promise<void> {
    new Committer(undefined, 'Added temp logs to changelog.json').commit();
  }

}
