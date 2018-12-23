import { PathsResolver } from '@bohr/changelogger/libs/paths/paths-resolver.class';
import { FeatureCloserHandler } from '@bohr/changelogger/processes/features/feature-closer-handler.class';
import { NewFeatureStarter } from '@bohr/changelogger/processes/features/new-feature.starter.class';
import { ReleaseCloser } from '@bohr/changelogger/processes/releases/closer/release-closer.class';
import { NewReleaseMaker } from '@bohr/changelogger/processes/releases/creator/new-release-maker.class';
import { LogsStasher } from '@bohr/changelogger/processes/stash-logs/logs-stasher.class';
import { questionMaker } from '@bohr/changelogger/questions/question-maker.function';
import { START_ACTION_PICKER, SUPPORTED_ACTIONS } from '@bohr/changelogger/questions/start-action-picker/start-action-picker';
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
      new FeatureCloserHandler().close();
      break;
    case SUPPORTED_ACTIONS.newRelease:
      new NewReleaseMaker().init();
      break;
    case SUPPORTED_ACTIONS.closeRelease:
      new ReleaseCloser().close();
      break;
    case SUPPORTED_ACTIONS.md:
      rendererStarter(choice.action);
      break;
  }
}

new PathsResolver().setPaths();
start();
