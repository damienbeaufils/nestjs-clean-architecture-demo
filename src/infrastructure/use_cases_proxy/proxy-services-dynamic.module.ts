import { DynamicModule, Module } from '@nestjs/common';
import { CreateDummyData } from '../../use_cases/create-dummy-data';
import { GetAllDummyData } from '../../use_cases/get-all-dummy-data';
import { DatabaseDummyRepository } from '../repositories/database-dummy.repository';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';

@Module({
  imports: [RepositoriesModule],
})
export class ProxyServicesDynamicModule {
  static GET_ALL_DUMMY_DATA_PROXY_SERVICE: string = 'GetAllDummyDataProxyService';
  static CREATE_DUMMY_DATA_PROXY_SERVICE: string = 'CreateDummyDataProxyService';

  static register(): DynamicModule {
    return {
      module: ProxyServicesDynamicModule,
      providers: [
        {
          inject: [DatabaseDummyRepository],
          provide: ProxyServicesDynamicModule.GET_ALL_DUMMY_DATA_PROXY_SERVICE,
          useFactory: (databaseDummyRepository: DatabaseDummyRepository) => new UseCaseProxy(new GetAllDummyData(databaseDummyRepository)),
        },
        {
          inject: [DatabaseDummyRepository],
          provide: ProxyServicesDynamicModule.CREATE_DUMMY_DATA_PROXY_SERVICE,
          useFactory: (databaseDummyRepository: DatabaseDummyRepository) => new UseCaseProxy(new CreateDummyData(databaseDummyRepository)),
        },
      ],
      exports: [ProxyServicesDynamicModule.GET_ALL_DUMMY_DATA_PROXY_SERVICE, ProxyServicesDynamicModule.CREATE_DUMMY_DATA_PROXY_SERVICE],
    };
  }
}
