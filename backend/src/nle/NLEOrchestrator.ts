import { createLogger } from '../shared/utils/Logger';
import { Blueprint } from '../shared/types';
import { MetaCompiler } from '../core/MetaCompiler';

export class NLEOrchestrator {
  private readonly logger = createLogger('NLEOrchestrator');

  constructor(private readonly compiler: MetaCompiler) {}

  transform(description: string): Blueprint {
    const blueprint: Blueprint = {
      description,
      targetModule: 'nle-generated-module',
      desiredOutcome: `Transformed ${description}`,
    };
    this.logger.info(`NLE generated blueprint for ${description}`);
    return blueprint;
  }

  compile(description: string): string {
    const blueprint = this.transform(description);
    return this.compiler.compileBlueprint(blueprint);
  }
}
