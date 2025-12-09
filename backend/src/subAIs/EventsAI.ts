import { BusinessUnitReport, SubAIStatus, Blueprint } from '../shared/types';
import { createLogger } from '../shared/utils/Logger';
import { EvolutionCore } from '../core/EvolutionCore';

export class EventsAI {
  private readonly logger = createLogger('EventsAI');
  private evolution?: EvolutionCore;

  connectEvolution(evolution: EvolutionCore): void {
    this.evolution = evolution;
    this.logger.info('EvolutionCore connected to EventsAI');
  }

  status(): SubAIStatus {
    return { name: 'EventsAI', metrics: { eventsPlanned: 4 }, health: 'operational' };
  }

  generateReport(): BusinessUnitReport {
    return { unit: 'events', insights: ['Ticket sales rising'], recommendations: ['Expand to new cities'] };
  }

  proposeExpansion(): Blueprint | string {
    if (!this.evolution) return 'Evolution engine not connected';
    const blueprint: Blueprint = {
      description: 'Automated event curation based on sentiment',
      targetModule: 'events-curator',
      desiredOutcome: 'Curate events dynamically',
    };
    return this.evolution.generateImprovements(blueprint);
  }
}
