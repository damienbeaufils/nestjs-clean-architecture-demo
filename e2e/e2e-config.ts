import { EnvironmentConfigService } from '../src/infrastructure/config/environment-config/environment-config.service';

export const e2eEnvironmentConfigService: EnvironmentConfigService = {
  get(key: string): string {
    if (key === 'DATABASE_TYPE') return 'sqlite';
    if (key === 'DATABASE_NAME') return 'e2e.sqlite';

    return null;
  },
} as EnvironmentConfigService;
