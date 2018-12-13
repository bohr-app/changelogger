import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { updateTypeSelector } from '@bohr/changelogger/questioner/question-makers/steps/update-type-selector.function';
import { UpdateTypes } from '@bohr/changelogger/questioner/question-makers/versioning/update-types.enum';
import * as fs from 'fs-extra';
import * as cmd from 'node-cmd';
import { argv } from 'yargs';

export class UpdateVersion extends PathsResolver {

  private noGitTag = '--no-git-tag-version ';
  private baseCommand = 'version ';
  private command = '';
  private updateType: UpdateTypes;
  private currentVersion: string;

  public async do(): Promise<string> {
    this.getUpdateType();

    if (!this.updateType)
      await this.askForUpdateType();

    console.log(`\nUpdate type: ${this.updateType}\n`);

    this.setCommand();
    this.doUpdate();
    this.getCurrentVersion();
    return this.currentVersion;
  }

  private getUpdateType(): void {
    this.updateType = argv.p ? UpdateTypes.p : argv.f ? UpdateTypes.f : argv.m ? UpdateTypes.m : undefined;
  }

  private setCommand(): void {
    if (process.env.TESTING)
      this.command += 'cd testfiles && ';
    this.command += 'npm ';
    this.command += this.noGitTag;
    this.command += this.baseCommand;
    this.command += this.updateType;
    console.log('command', this.command);
  }

  private doUpdate(): void {
    cmd.run(this.command);
  }

  private async askForUpdateType(): Promise<void> {
    const choice = await updateTypeSelector();
    this.updateType = choice.type;
  }

  private getCurrentVersion(): void {
    this.setPaths();
    const packageInfo = fs.readJSONSync(this.packageJsonPath);
    this.currentVersion = packageInfo.version;
  }

}
