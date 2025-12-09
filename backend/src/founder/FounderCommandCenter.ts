import { NorahOrchestrator } from '../core/NorahOrchestrator';
import { Command } from '../shared/types';
import { createLogger } from '../shared/utils/Logger';

export class FounderCommandCenter {
  private readonly logger = createLogger('FounderCommandCenter');

  constructor(private readonly norah: NorahOrchestrator) {}

  send(commandText: string): string {
    const command: Command = { origin: 'founder', payload: commandText, priority: 10 };
    this.logger.info(`Dispatching founder command: ${commandText}`);
    return this.norah.routeCommand(command);
  }
}
