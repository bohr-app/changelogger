import { FeatureCloser } from '@bohr/changelogger/flow/feature-closer.class';
import { PathsResolver } from '@bohr/changelogger/paths/paths-resolver.class';
import { NewFeatureStarter } from '@bohr/changelogger/processes/new-feature/new-feature.starter.class';
import { NewReleaseMaker } from '@bohr/changelogger/processes/new-release/new-release-maker.class';
import { questionMaker } from '@bohr/changelogger/processes/questions/question-maker.function';
import { START_ACTION_PICKER, SUPPORTED_ACTIONS } from '@bohr/changelogger/processes/questions/start-action-picker/start-action-picker';
import { LogsStasher } from '@bohr/changelogger/processes/stash-logs/logs-stasher.class';
import { rendererStarter } from '@bohr/changelogger/renderers/renderer-starter.function';

export async function start(): Promise<void> {

  const choice = await questionMaker([START_ACTION_PICKER]);

  switch (choice.action as SUPPORTED_ACTIONS) {
    case SUPPORTED_ACTIONS.stash:
      new LogsStasher().init();
      break;
    case SUPPORTED_ACTIONS.newFeature:
      new NewFeatureStarter().start();
      break;
    case SUPPORTED_ACTIONS.closeFeature:
      new FeatureCloser().close();
      new LogsStasher().init();
      break;
    case SUPPORTED_ACTIONS.log:
      new NewReleaseMaker().init();
      break;
    case SUPPORTED_ACTIONS.md:
      rendererStarter(choice.action);
      break;
  }
}

new PathsResolver().setPaths();
start();
