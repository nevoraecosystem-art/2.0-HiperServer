import crypto from 'crypto';
import { createLogger } from '../shared/utils/Logger';

export class SecurityCore {
  private readonly logger = createLogger('SecurityCore');

  hashPayload(payload: string): string {
    const hash = crypto.createHash('sha256').update(payload).digest('hex');
    this.logger.debug(`Payload hashed length=${hash.length}`);
    return hash;
  }

  verifyAccess(token: string): boolean {
    const valid = token.length > 10;
    this.logger.info(`Access token validation=${valid}`);
    return valid;
  }
}
