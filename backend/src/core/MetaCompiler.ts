import { Blueprint } from '../shared/types';
import { createLogger } from '../shared/utils/Logger';

export class MetaCompiler {
  private readonly logger = createLogger('MetaCompiler');

  compileBlueprint(blueprint: Blueprint): string {
    this.logger.info(`Compiling blueprint for ${blueprint.targetModule}`);
    const banner = `// Auto-generated from blueprint for ${blueprint.targetModule}\n`;
    const body = `export const outcome = "${blueprint.desiredOutcome}";\n`;
    return banner + body;
  }
}
