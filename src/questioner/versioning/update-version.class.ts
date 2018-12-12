import { updateTypeSelector } from '@bohr/changelogger/questioner/steps/update-type-selector.function';
import { UpdateTypes } from '@bohr/changelogger/questioner/versioning/update-types.enum';
import * as cmd from 'node-cmd';
import { argv } from 'yargs';

export class UpdateVersion {

  private baseCommand = 'npm --no-git-tag-version version ';

  private updateType: UpdateTypes;

  public async do(): Promise<void> {
    this.getUpdateType();

    if (!this.updateType)
      await this.askForUpdateType();

    console.log(`\nUpdate type: ${this.updateType}\n`);

    if (!process.env.TESTING)
      this.doUpdate();
  }

  private getUpdateType(): void {
    this.updateType = argv.p ? UpdateTypes.p : argv.f ? UpdateTypes.f : argv.m ? UpdateTypes.m : undefined;
  }

  private doUpdate(): void {
    cmd.run(`${this.baseCommand}${this.updateType}`);
  }

  private async askForUpdateType(): Promise<void> {
    const choice = await updateTypeSelector();
    this.updateType = choice.type;
  }

}
