import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';
import { handleUncommittedChanges } from '@bohr/changelogger/processes/common-ops/handle-uncommitted-changes.function';
import { FEATURE_NAME } from '@bohr/changelogger/processes/questions/git/feature-name.constant';
import { questionMaker } from '@bohr/changelogger/processes/questions/question-maker.function';
import { argv } from 'yargs';

export class NewFeatureStarter extends FlowBase {

  private featureName: string;

  public async start(): Promise<void> {
    if (!argv.sg)
      await handleUncommittedChanges();

    await this.getFeatureName();

    await this.checkoutToDevelop();

    await this.createBranch(`feature/${this.featureName}`);

    await this.pushCurrent();
  }

  private async getFeatureName(): Promise<void> {
    const res = await questionMaker(FEATURE_NAME);
    this.featureName = res.name;
  }

}
