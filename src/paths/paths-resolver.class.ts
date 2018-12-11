import { JSON_FILE_NAME, MD_FILE_NAME } from '@bohr/changelogger/questioner/storer/filenames.constant';
import * as path from 'path';

export class PathsResolver {

  protected path: string;
  protected pathToChangelogJson: string;
  protected pathToChangelogMD: string;

  protected setPaths(): void {
    this.setPath();
    this.setJsonPath();
    this.setMdPath();
  }

  private setPath(): void {
    this.path = process.env.TESTING ? `${process.cwd()}/testfiles` : process.cwd();
  }

  private setJsonPath(): void {
    this.pathToChangelogJson = path.join(this.path, JSON_FILE_NAME);
  }

  private setMdPath(): void {
    this.pathToChangelogMD = path.join(this.path, MD_FILE_NAME);
  }

}
