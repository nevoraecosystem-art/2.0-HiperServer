import { Command } from '../shared/types';
import { createLogger, Logger } from '../shared/utils/Logger';
import { GovernanceCore } from './GovernanceCore';
import { EvolutionCore } from './EvolutionCore';

export class FounderCore {
  private readonly logger: Logger = createLogger('FounderCore');

  constructor(private readonly governance: GovernanceCore, private readonly evolution: EvolutionCore) {}

  interpret(command: Command): string {
    this.logger.info(`Interpreting command from ${command.origin}: ${command.payload}`);
    if (command.origin !== 'founder') {
      return 'Rejected: only founder commands are authorized at this level.';
    }
    const approved = this.governance.approveStrategicShift(command.payload);
    if (approved) {
      this.evolution.enableRebuildMode();
      return 'Command authorized and evolution mode armed.';
    }
    return 'Command reviewed but no strategic shift approved.';
  }

  authorize(module: string): string {
    this.logger.warn(`Authorizing deep modification for ${module}`);
    this.evolution.flagModuleForRebuild(module);
    return `Module ${module} authorized for reconstruction.`;
  }

  generateReport(): string {
    const report = this.evolution.generateEvolutionReport();
    this.logger.info('Generated founder-level evolution report');
    return report;
  }
}
