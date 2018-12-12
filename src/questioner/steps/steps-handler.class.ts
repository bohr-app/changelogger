import { errorHandler } from '@bohr/changelogger/errors/error-handler.function';
import { fatalErrors, infoErrors } from '@bohr/changelogger/errors/errors.enum';
import { changeAdder } from '@bohr/changelogger/questioner/steps/change-adder.function';
import { nextStep } from '@bohr/changelogger/questioner/steps/next-step.function';
import { Answers } from 'inquirer';

export class StepsHandler {

  private newChanges: Array<Answers> = [];

  public async start(): Promise<Array<Answers>> {
    await this.newQuestion();
    this.finish();
    return this.newChanges;
  }

  private async newQuestion(): Promise<void> {
    const answers = await changeAdder();
    this.pushNewAnswers(answers);
    await this.enquireNextStep();
  }

  private pushNewAnswers(answers: Answers): void {
    this.newChanges.push(answers);
  }

  private async enquireNextStep(): Promise<void> {
    const answer = await nextStep();
    if (answer['next'] === 'add')
      await this.newQuestion();
  }

  private finish(): void {
    if (this.noMeaningfulData())
      errorHandler(fatalErrors.noLogsProvided);
    this.cleanEmptyMessages();
  }

  private noMeaningfulData(): boolean {
    const arrMeaningless = this.newChanges.filter(change => change.value === '');
    return arrMeaningless.length === this.newChanges.length;
  }

  private cleanEmptyMessages(): void {
    const cleaned = this.newChanges.filter(change => change.value !== '');

    if (cleaned.length === this.newChanges.length)
      return;

    errorHandler(infoErrors.cleanedEmpty);
    this.newChanges = cleaned;
  }

}
