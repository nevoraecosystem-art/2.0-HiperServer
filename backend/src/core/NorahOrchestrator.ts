import { Command, Blueprint, Patch } from '../shared/types';
import { createLogger, Logger } from '../shared/utils/Logger';
import { FounderCore } from './FounderCore';
import { GovernanceCore } from './GovernanceCore';
import { EvolutionCore } from './EvolutionCore';
import { NeuralCore } from './NeuralCore';
import { BusinessCore } from './BusinessCore';
import { XRCore } from './XRCore';
import { BlockchainCore } from './BlockchainCore';
import { MetaCompiler } from './MetaCompiler';
import { PatchEngine } from './PatchEngine';
import { SelfRebuildEngine } from './SelfRebuildEngine';

export class NorahOrchestrator {
  private readonly logger: Logger = createLogger('NorahOrchestrator');
  private readonly governance = new GovernanceCore();
  private readonly metaCompiler = new MetaCompiler();
  private readonly patchEngine = new PatchEngine();
  private readonly selfRebuild = new SelfRebuildEngine();
  private readonly evolution = new EvolutionCore(this.metaCompiler, this.patchEngine, this.selfRebuild);
  private readonly founder = new FounderCore(this.governance, this.evolution);
  private readonly neural = new NeuralCore();
  private readonly business = new BusinessCore(this.evolution);
  private readonly xr = new XRCore();
  private readonly blockchain = new BlockchainCore();

  routeCommand(command: Command): string {
    this.logger.info(`Routing command from ${command.origin}`);
    this.neural.remember(command);
    if (command.origin === 'founder') {
      return this.founder.interpret(command);
    }
    if (command.payload.includes('evolve')) {
      return this.evolution.autoEvolve();
    }
    return 'Command routed with no direct action';
  }

  applyBlueprint(blueprint: Blueprint): string {
    this.logger.info(`Applying blueprint for ${blueprint.targetModule}`);
    return this.evolution.generateImprovements(blueprint);
  }

  patch(patch: Patch): string {
    this.logger.info(`Applying patch to ${patch.filePath}`);
    return this.evolution.applyPatch(patch);
  }

  diagnostics(): Record<string, unknown> {
    return {
      priorities: this.governance,
      context: this.neural.currentContext(),
      subAIStatus: this.business.status(),
    };
  }

  businessPulse(): string {
    const health = this.governance.healthCheck(this.business.status());
    const reports = this.business.orchestrate();
    return `${health}. Reports generated: ${reports.length}`;
  }

  rebuildSubsystem(name: string): string {
    return this.selfRebuild.resetSubsystem(name);
  }

  deployXR(name: string): string {
    return this.xr.deployExperience(name);
  }

  mintAsset(name: string, owner: string): string {
    return this.blockchain.mintAsset(name, owner);
  }
}
