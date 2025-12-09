export interface Command {
  origin: 'founder' | 'system' | 'subAI';
  payload: string;
  priority?: number;
}

export interface Blueprint {
  description: string;
  targetModule: string;
  desiredOutcome: string;
}

export interface Patch {
  filePath: string;
  content: string;
  reason: string;
}

export interface SubAIStatus {
  name: string;
  metrics: Record<string, number>;
  health: 'operational' | 'degraded' | 'offline';
}

export interface BusinessUnitReport {
  unit: string;
  insights: string[];
  recommendations: string[];
}
