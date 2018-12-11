import * as cmd from 'node-cmd';
import { argv } from 'yargs';

export class UpdateVersion {

  private baseCommand = 'npm --no-git-tag-version version ';

  private updateType: 'patch' | 'minor' | 'major';

  public do(): boolean {
    this.getUpdateType();

    if (!this.updateType)
      return false;

    console.log(`Update type: ${this.updateType}\n`);

    if (!process.env.TESTING)
      this.doUpdate();

    return true;
  }

  private getUpdateType(): void {
    this.updateType = argv.p ? 'patch' : argv.f ? 'minor' : argv.m ? 'major' : undefined;
  }

  private doUpdate(): void {
    cmd.run(`${this.baseCommand}${this.updateType}`);
  }

}
