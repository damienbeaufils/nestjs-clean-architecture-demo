import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';

@Module({
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
