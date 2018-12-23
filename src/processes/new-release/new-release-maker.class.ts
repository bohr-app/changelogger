import { ReleaseBranchCreator } from '@bohr/changelogger/libs/flow//release-branch-creator.class';
import { BranchCloser } from '@bohr/changelogger/libs/git-manager/branch-closer.class';
import { Committer } from '@bohr/changelogger/libs/git-manager/committer.class';
import { DIRS } from '@bohr/changelogger/libs/paths/dirs.constant';
import { handleUncommittedChanges } from '@bohr/changelogger/processes/common-ops/handle-uncommitted-changes.function';
import { StepsHandler } from '@bohr/changelogger/processes/new-release/steps/steps-handler.class';
import { ChangesStorer } from '@bohr/changelogger/processes/new-release/storer/changes-storer.class';
import { ChangeDetails, ChangeItems } from '@bohr/changelogger/processes/new-release/storer/deafult-contents.constant';
import { VersionPreparator } from '@bohr/changelogger/processes/new-release/storer/version-preparator.class';
import { UpdateVersion } from '@bohr/changelogger/processes/new-release/versioning/update-version.class';
import { TempLogsGetter } from '@bohr/changelogger/processes/stash-logs/temp-logs-getter.class';
import { MdMaker } from '@bohr/changelogger/renderers/mark-down/md-maker.class';
import * as fs from 'fs-extra';
import { argv } from 'yargs';

export class NewReleaseMaker {

  private newChanges: Array<ChangeItems>;
  private changeDetails: ChangeDetails;

  public async init(): Promise<void> {

    if (!argv.sg)
      await handleUncommittedChanges();

    await this.bumpVersion();

    await this.handleGitFlow();

    await this.handleTempLogs();

    await this.askChangesDetails();
    this.makeChangeDetailsObject();
    this.storeInJson();
    this.renderMd();

    if (!argv.sg)
      await this.commitNewVersion();
  }

  private async handleGitFlow(): Promise<void> {
    if (argv.sg || argv.sf || process.env.TESTING)
      return;

    await new BranchCloser('feature', 'develop', true).close();
    await new ReleaseBranchCreator().create();
  }

  private async handleTempLogs(): Promise<void> {
    this.newChanges = await new TempLogsGetter().get();
  }

  private async bumpVersion(): Promise<void> {
    await new UpdateVersion().do();
  }

  private async askChangesDetails(): Promise<void> {
    const newlyAdded = await new StepsHandler(this.newChanges.length).start() as Array<ChangeItems>;
    newlyAdded.forEach(change => this.newChanges.push(change));
  }

  private makeChangeDetailsObject(): void {
    this.changeDetails = new VersionPreparator(this.newChanges).make();
  }

  private storeInJson(): void {
    new ChangesStorer(this.changeDetails).storeChanges();
  }

  private renderMd(): void {
    new MdMaker().make();
  }

  private async commitNewVersion(): Promise<void> {
    const packageInfo = fs.readJSONSync(DIRS.packageJsonPath);
    await new Committer(undefined, `Version ${packageInfo.version}`).commit();
  }

}
