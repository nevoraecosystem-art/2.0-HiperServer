import { Command } from '../shared/types';
import { createLogger, Logger } from '../shared/utils/Logger';

export class NeuralCore {
  private readonly logger: Logger = createLogger('NeuralCore');
  private shortTermMemory: Command[] = [];
  private context: Record<string, unknown> = {};

  remember(command: Command): void {
    this.shortTermMemory.push(command);
    if (this.shortTermMemory.length > 20) {
      this.shortTermMemory.shift();
    }
    this.logger.debug(`Context captured from ${command.origin}`);
  }

  currentContext(): Record<string, unknown> {
    return { ...this.context, lastCommand: this.shortTermMemory[this.shortTermMemory.length - 1] };
  }

  updateContext(key: string, value: unknown): void {
    this.context[key] = value;
    this.logger.info(`Context key ${key} updated`);
  }
}
