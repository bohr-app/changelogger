import { Committer } from '@bohr/changelogger/git-manager/committer.class';
import { UncommittedChecker } from '@bohr/changelogger/git-manager/uncommitted-checker.class';

export async function handleUncommittedChanges(): Promise<void> {
  const files = await new UncommittedChecker().exist();
  if (files.uncommitted.length || files.untracked.length)
    await new Committer(files).commit();
}