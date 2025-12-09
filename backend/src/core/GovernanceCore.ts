import { createLogger, Logger } from '../shared/utils/Logger';
import { SubAIStatus } from '../shared/types';

export class GovernanceCore {
  private readonly logger: Logger = createLogger('GovernanceCore');
  private priorities: string[] = ['stability', 'expansion', 'compliance'];
  private state: Record<string, unknown> = {};

  setPriority(priority: string): void {
    if (!this.priorities.includes(priority)) {
      this.priorities.unshift(priority);
      this.logger.info(`New priority added: ${priority}`);
    }
  }

  approveStrategicShift(description: string): boolean {
    this.logger.info(`Evaluating strategic shift: ${description}`);
    return description.length > 5;
  }

  reorganizeSystem(reason: string): string {
    this.logger.warn(`Reorganizing system due to ${reason}`);
    return `System reorganized to address ${reason}`;
  }

  updateState(key: string, value: unknown): void {
    this.state[key] = value;
    this.logger.debug(`State updated: ${key}`);
  }

  healthCheck(subAIs: SubAIStatus[]): string {
    const degraded = subAIs.filter((s) => s.health !== 'operational');
    const msg = degraded.length === 0 ? 'All sub-AIs operational' : `Degraded modules: ${degraded.map((d) => d.name).join(', ')}`;
    this.logger.info(msg);
    return msg;
  }
}
