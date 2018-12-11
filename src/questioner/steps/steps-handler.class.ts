import { cleanedEmpty } from '@bohr/changelogger/errors/cleaned-empty.function';
import { noLogsProvided } from '@bohr/changelogger/errors/no-logs-provided.function';
import { changeAdder } from '@bohr/changelogger/questioner/steps/change-adder.function';
import { nextStep } from '@bohr/changelogger/questioner/steps/next-step.function';
import { ChangeItems } from '@bohr/changelogger/questioner/storer/deafult-contents.constant';
import { VersionPreparator } from '@bohr/changelogger/questioner/storer/version-preparator.class';
import { Answers } from 'inquirer';

export class StepsHandler {

  private newChanges: Array<Answers> = [];

  public start(): void {
    this.newQuestion();
  }

  private async newQuestion(): Promise<void> {
    const answers = await changeAdder();
    this.pushNewAnswers(answers);
    this.enquireNextStep();
  }

  private pushNewAnswers(answers: Answers): void {
    this.newChanges.push(answers);
  }

  private async enquireNextStep(): Promise<void> {
    const answer = await nextStep();
    if (answer['next'] === 'add')
      this.newQuestion();
    else
      this.finish();
  }

  private finish(): void {
    if (this.noMeaningfulData())
      return noLogsProvided();
    this.cleanEmptyMessages();
    new VersionPreparator(this.newChanges as Array<ChangeItems>).make();
  }

  private noMeaningfulData(): boolean {
    const arrMeaningless = this.newChanges.filter(change => change.value === '');
    return arrMeaningless.length === this.newChanges.length;
  }

  private cleanEmptyMessages(): void {
    const cleaned = this.newChanges.filter(change => change.value !== '');

    if (cleaned.length === this.newChanges.length)
      return;

    cleanedEmpty();
    this.newChanges = cleaned;
  }

}
