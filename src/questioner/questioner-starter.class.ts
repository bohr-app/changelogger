import { Committer } from '@bohr/changelogger/git-manager/committer.class';
import { UncommittedChecker } from '@bohr/changelogger/git-manager/uncommitted-checker.class';
import { StepsHandler } from '@bohr/changelogger/questioner/steps/steps-handler.class';
import { ChangeDetails, ChangeItems } from '@bohr/changelogger/questioner/storer/deafult-contents.constant';
import { Storer } from '@bohr/changelogger/questioner/storer/storer.class';
import { VersionPreparator } from '@bohr/changelogger/questioner/storer/version-preparator.class';
import { UpdateVersion } from '@bohr/changelogger/questioner/versioning/update-version.class';
import { MdMaker } from '@bohr/changelogger/renderers/mark-down/md-maker.class';

export class QuestionerStarter {

  private newChanges: Array<ChangeItems>;
  private changeDetails: ChangeDetails;
  private currentVersion: string;

  public async init(): Promise<void> {
    await this.handleUncommittedChanges();
    await this.bumpVersion();
    await this.askChangesDetails();
    this.makeChangeDetailsObject();
    this.storeInJson();
    this.renderMd();
    await this.commitNewVersion();
  }

  private async handleUncommittedChanges(): Promise<void> {
    const files = await new UncommittedChecker().exist();
    if (files.uncommitted.length || files.untracked.length)
      await new Committer(files).commit();
  }

  private async bumpVersion(): Promise<void> {
    this.currentVersion = await new UpdateVersion().do();
  }

  private async askChangesDetails(): Promise<void> {
    this.newChanges = await new StepsHandler().start() as Array<ChangeItems>;
  }

  private makeChangeDetailsObject(): void {
    this.changeDetails = new VersionPreparator(this.newChanges).make();
  }

  private storeInJson(): void {
    new Storer(this.changeDetails).storeChanges();
  }

  private renderMd(): void {
    new MdMaker().make();
  }

  private async commitNewVersion(): Promise<void> {
    await new Committer(undefined, `Version ${this.currentVersion}`).commit();
  }

}
