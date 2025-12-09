import { EnvLoader } from './EnvLoader';

export interface ApplicationConfig {
  port: number;
  environment: 'development' | 'production' | 'test';
  ecosystemName: string;
}

export const AppConfig: ApplicationConfig = {
  port: Number(EnvLoader.get('PORT', '4000')),
  environment: (EnvLoader.get('NODE_ENV', 'development') as ApplicationConfig['environment']),
  ecosystemName: EnvLoader.get('ECOSYSTEM_NAME', 'Norah 12.0'),
};
