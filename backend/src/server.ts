import express from 'express';
import cors from 'cors';
import eventsRoutes from './business/events/routes';
import { createLogger } from './shared/utils/Logger';
import { NorahOrchestrator } from './core/NorahOrchestrator';
import { AppConfig } from './config/AppConfig';

export const buildServer = () => {
  const app = express();
  const logger = createLogger('Server');
  const norah = new NorahOrchestrator();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', ecosystem: AppConfig.ecosystemName });
  });

  app.post('/command', (req, res) => {
    const result = norah.routeCommand({ origin: 'system', payload: req.body?.command ?? '' });
    res.json({ result });
  });

  app.use('/events', eventsRoutes);

  app.use((err: Error, _req, res, _next) => {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  });

  return { app, norah };
};
