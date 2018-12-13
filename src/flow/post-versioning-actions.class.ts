import { FlowBase } from '@bohr/changelogger/flow/flow-base.class';

export class PostVersioningActions extends FlowBase {

  public async handle(): Promise<void> {
    this.init();
  }

}
