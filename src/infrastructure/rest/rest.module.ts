import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProxyServicesDynamicModule } from '../use_cases_proxy/proxy-services-dynamic.module';
import { DummyController } from './dummy.controller';
import { InvalidDummyErrorFilter } from './filters/invalid-dummy-error.filter';

@Module({
  imports: [ProxyServicesDynamicModule.register()],
  controllers: [DummyController],
  providers: [{ provide: APP_FILTER, useClass: InvalidDummyErrorFilter }],
})
export class RestModule {}
