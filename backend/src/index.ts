import { buildServer } from './server';
import { AppConfig } from './config/AppConfig';
import { createLogger } from './shared/utils/Logger';

const logger = createLogger('Bootstrap');
const { app } = buildServer();

app.listen(AppConfig.port, () => {
  logger.info(`Norah 12.0 backend listening on port ${AppConfig.port}`);
});
