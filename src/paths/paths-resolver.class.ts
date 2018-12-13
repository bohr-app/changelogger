import { JSON_FILE_NAME, MD_FILE_NAME } from '@bohr/changelogger/questioner/question-makers/storer/filenames.constant';
import * as path from 'path';

export class PathsResolver {

  protected path: string;
  protected gitPath: string;
  protected packageJsonPath: string;
  protected pathToChangelogJson: string;
  protected pathToChangelogMD: string;

  protected setPaths(): void {
    this.setPath();
    this.setGitPath();
    this.setPackageJsonPath();
    this.setJsonPath();
    this.setMdPath();
  }

  private setPath(): void {
    this.path = process.env.TESTING ? `${process.cwd()}/testfiles` : process.cwd();
  }

  private setGitPath(): void {
    this.gitPath = process.cwd();
  }

  private setPackageJsonPath(): void {
    this.packageJsonPath = path.join(this.path, 'package.json');
  }

  private setJsonPath(): void {
    this.pathToChangelogJson = path.join(this.path, JSON_FILE_NAME);
  }

  private setMdPath(): void {
    this.pathToChangelogMD = path.join(this.path, MD_FILE_NAME);
  }

}
