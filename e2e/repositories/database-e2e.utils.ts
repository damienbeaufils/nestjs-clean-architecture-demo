import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { EnvironmentConfigService } from '../../src/infrastructure/config/environment-config/environment-config.service';
import { getTypeOrmMigrationsOptions } from '../../src/infrastructure/config/typeorm/typeorm-config.module';

export const runDatabaseMigrations = async (environmentConfigService: EnvironmentConfigService) => {
  const connection: Connection = await createConnection({
    ...getTypeOrmMigrationsOptions(environmentConfigService),
    name: 'e2e',
  } as ConnectionOptions);
  await connection.runMigrations();
  await connection.close();
};
