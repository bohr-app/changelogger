import { updateTypeSelector } from '@bohr/changelogger/questioner/steps/update-type-selector.function';
import { UpdateTypes } from '@bohr/changelogger/questioner/versioning/update-types.enum';
import * as cmd from 'node-cmd';
import { argv } from 'yargs';

export class UpdateVersion {

  private noGitTag = '--no-git-tag-version ';
  private baseCommand = 'version ';
  private command = '';

  private updateType: UpdateTypes;

  public async do(): Promise<void> {
    this.getUpdateType();

    if (!this.updateType)
      await this.askForUpdateType();

    console.log(`\nUpdate type: ${this.updateType}\n`);

    this.setCommand();
    this.doUpdate();
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

}
