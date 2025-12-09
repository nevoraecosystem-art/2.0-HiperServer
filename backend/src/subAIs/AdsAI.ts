import { BusinessUnitReport, SubAIStatus, Blueprint } from '../shared/types';
import { createLogger } from '../shared/utils/Logger';
import { EvolutionCore } from '../core/EvolutionCore';

export class AdsAI {
  private readonly logger = createLogger('AdsAI');
  private evolution?: EvolutionCore;

  connectEvolution(evolution: EvolutionCore): void {
    this.evolution = evolution;
  }

  status(): SubAIStatus {
    return { name: 'AdsAI', metrics: { ctr: 0.041 }, health: 'operational' };
  }

  generateReport(): BusinessUnitReport {
    return { unit: 'ads', insights: ['CTR improving'], recommendations: ['Test new creative clusters'] };
  }

  optimizeCampaigns(): string {
    const blueprint: Blueprint = {
      description: 'Generative ad creative engine',
      targetModule: 'ads-gen',
      desiredOutcome: 'Higher engagement',
    };
    return this.evolution ? this.evolution.generateImprovements(blueprint) : 'Evolution engine not connected';
  }
}
