import { createLogger, Logger } from '../shared/utils/Logger';
import { SubAIStatus, BusinessUnitReport } from '../shared/types';
import { EventsAI } from '../subAIs/EventsAI';
import { BarOpsAI } from '../subAIs/BarOpsAI';
import { ExperienceOpsAI } from '../subAIs/ExperienceOpsAI';
import { ArtistAI } from '../subAIs/ArtistAI';
import { MarketAI } from '../subAIs/MarketAI';
import { FinanceAI } from '../subAIs/FinanceAI';
import { OpportunityAI } from '../subAIs/OpportunityAI';
import { AdsAI } from '../subAIs/AdsAI';
import { EvolutionCore } from './EvolutionCore';

export class BusinessCore {
  private readonly logger: Logger = createLogger('BusinessCore');
  public readonly eventsAI: EventsAI;
  public readonly barOpsAI: BarOpsAI;
  public readonly experienceAI: ExperienceOpsAI;
  public readonly artistAI: ArtistAI;
  public readonly marketAI: MarketAI;
  public readonly financeAI: FinanceAI;
  public readonly opportunityAI: OpportunityAI;
  public readonly adsAI: AdsAI;

  constructor(evolution?: EvolutionCore) {
    this.eventsAI = new EventsAI();
    this.barOpsAI = new BarOpsAI();
    this.experienceAI = new ExperienceOpsAI();
    this.artistAI = new ArtistAI();
    this.marketAI = new MarketAI();
    this.financeAI = new FinanceAI();
    this.opportunityAI = new OpportunityAI();
    this.adsAI = new AdsAI();

    if (evolution) {
      this.eventsAI.connectEvolution(evolution);
      this.barOpsAI.connectEvolution(evolution);
      this.experienceAI.connectEvolution(evolution);
      this.artistAI.connectEvolution(evolution);
      this.marketAI.connectEvolution(evolution);
      this.financeAI.connectEvolution(evolution);
      this.opportunityAI.connectEvolution(evolution);
      this.adsAI.connectEvolution(evolution);
    }
  }

  status(): SubAIStatus[] {
    const statuses = [
      this.eventsAI.status(),
      this.barOpsAI.status(),
      this.experienceAI.status(),
      this.artistAI.status(),
      this.marketAI.status(),
      this.financeAI.status(),
      this.opportunityAI.status(),
      this.adsAI.status(),
    ];
    this.logger.info('Collected Sub-AI statuses');
    return statuses;
  }

  orchestrate(): BusinessUnitReport[] {
    this.logger.info('Orchestrating business units');
    return [
      this.eventsAI.generateReport(),
      this.barOpsAI.generateReport(),
      this.experienceAI.generateReport(),
      this.artistAI.generateReport(),
      this.marketAI.generateReport(),
      this.financeAI.generateReport(),
      this.opportunityAI.generateReport(),
      this.adsAI.generateReport(),
    ];
  }
}
