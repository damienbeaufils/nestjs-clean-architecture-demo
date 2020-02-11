import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm-config.module';
import { DatabaseDummyRepository } from './database-dummy.repository';
import { DummyEntity } from './entities/dummy.entity';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([DummyEntity]), EnvironmentConfigModule],
  providers: [DatabaseDummyRepository],
  exports: [DatabaseDummyRepository],
})
export class RepositoriesModule {}
