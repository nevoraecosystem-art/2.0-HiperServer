import { Router } from 'express';
import { createLogger } from '../../shared/utils/Logger';

const router = Router();
const logger = createLogger('EventsRoutes');

router.get('/', (_req, res) => {
  logger.info('Listing events');
  res.json({ events: [] });
});

router.post('/', (req, res) => {
  logger.info('Creating event');
  res.status(201).json({ received: req.body });
});

export default router;
