import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DummyEntity } from '../../repositories/entities/dummy.entity';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (environmentConfigService: EnvironmentConfigService): TypeOrmModuleOptions =>
  ({
    type: environmentConfigService.get('DATABASE_TYPE'),
    host: environmentConfigService.get('DATABASE_HOST'),
    port: parseInt(environmentConfigService.get('DATABASE_PORT'), 10),
    username: environmentConfigService.get('DATABASE_USERNAME'),
    password: environmentConfigService.get('DATABASE_PASSWORD'),
    database: environmentConfigService.get('DATABASE_NAME'),
    entities: [DummyEntity],
    ssl: true,
  } as TypeOrmModuleOptions);

export const getTypeOrmMigrationsOptions = (environmentConfigService: EnvironmentConfigService) => ({
  ...getTypeOrmModuleOptions(environmentConfigService),
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrations: ['**/migrations/*migration*.ts'],
  name: 'schema',
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
