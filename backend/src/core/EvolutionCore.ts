import { Blueprint, Patch } from '../shared/types';
import { createLogger, Logger } from '../shared/utils/Logger';
import { MetaCompiler } from './MetaCompiler';
import { PatchEngine } from './PatchEngine';
import { SelfRebuildEngine } from './SelfRebuildEngine';

export class EvolutionCore {
  private readonly logger: Logger = createLogger('EvolutionCore');
  private rebuildMode = false;
  private flaggedModules: Set<string> = new Set();

  constructor(private readonly compiler: MetaCompiler, private readonly patchEngine: PatchEngine, private readonly selfRebuild: SelfRebuildEngine) {}

  enableRebuildMode(): void {
    this.rebuildMode = true;
    this.logger.warn('Rebuild mode enabled');
  }

  flagModuleForRebuild(module: string): void {
    this.flaggedModules.add(module);
    this.logger.info(`Module flagged for rebuild: ${module}`);
  }

  detectInefficiencies(files: string[]): string[] {
    this.logger.debug('Scanning for inefficiencies');
    return files.filter((f) => f.includes('old') || f.includes('legacy'));
  }

  generateImprovements(blueprint: Blueprint): string {
    this.logger.info(`Generating improvements for ${blueprint.targetModule}`);
    const code = this.compiler.compileBlueprint(blueprint);
    this.selfRebuild.persistModule(blueprint.targetModule, code);
    return `Improvement generated for ${blueprint.targetModule}`;
  }

  applyPatch(patch: Patch): string {
    this.logger.debug(`Applying patch to ${patch.filePath}`);
    this.patchEngine.applyPatch(patch);
    return `Patched ${patch.filePath}`;
  }

  autoEvolve(): string {
    const modules = Array.from(this.flaggedModules);
    modules.forEach((module) => {
      this.selfRebuild.rebuildModule(module);
      this.logger.info(`Rebuilt module ${module}`);
    });
    this.flaggedModules.clear();
    this.rebuildMode = false;
    return 'Auto-evolution cycle completed';
  }

  generateEvolutionReport(): string {
    return `EvolutionCore report: rebuildMode=${this.rebuildMode}, pending=${this.flaggedModules.size}`;
  }
}
