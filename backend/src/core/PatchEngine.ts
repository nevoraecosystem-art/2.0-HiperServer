import fs from 'fs';
import path from 'path';
import { Patch } from '../shared/types';
import { createLogger } from '../shared/utils/Logger';

export class PatchEngine {
  private readonly logger = createLogger('PatchEngine');

  applyPatch(patch: Patch): void {
    const targetPath = path.resolve(process.cwd(), patch.filePath);
    this.logger.info(`Persisting patch at ${targetPath}`);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, patch.content, 'utf-8');
  }
}
