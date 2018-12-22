import { FeatureCloser } from '@bohr/changelogger/processes/feature-closer/feature-closer.class';
import { questionMaker } from '@bohr/changelogger/processes/questions/question-maker.function';
import { ADD_TEMP_AFTER_FEATURE_CLOSED } from '@bohr/changelogger/processes/questions/temp-logs/add-temp-after-feature-closed.constant';
import { LogsStasher } from '@bohr/changelogger/processes/stash-logs/logs-stasher.class';

export class FeatureCloserHandler {

  public async close(): Promise<void> {
    await this.doClose();
    if (await this.wantsToAddTempLogs())
      await this.addTempLogs();
  }

  private async doClose(): Promise<void> {
    await new FeatureCloser().close();
  }

  private async wantsToAddTempLogs(): Promise<boolean> {
    const res = await questionMaker(ADD_TEMP_AFTER_FEATURE_CLOSED);
    return res.choice as boolean;
  }

  private async addTempLogs(): Promise<void> {
    new LogsStasher().init();
  }

}
