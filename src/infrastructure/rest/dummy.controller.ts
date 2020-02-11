import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Dummy } from '../../domain/dummy';
import { CreateDummyData } from '../../use_cases/create-dummy-data';
import { GetAllDummyData } from '../../use_cases/get-all-dummy-data';
import { ProxyServicesDynamicModule } from '../use_cases_proxy/proxy-services-dynamic.module';
import { UseCaseProxy } from '../use_cases_proxy/use-case-proxy';
import { PostDummyDataRequest } from './models/post-dummy-data-request';

@Controller('/api/dummy')
export class DummyController {
  constructor(
    @Inject(ProxyServicesDynamicModule.GET_ALL_DUMMY_DATA_PROXY_SERVICE) private readonly getAllDummyDataProxyService: UseCaseProxy<GetAllDummyData>,
    @Inject(ProxyServicesDynamicModule.CREATE_DUMMY_DATA_PROXY_SERVICE) private readonly createDummyDataProxyService: UseCaseProxy<CreateDummyData>
  ) {}

  @Get('/')
  async getAllDummyData(): Promise<Dummy[]> {
    return this.getAllDummyDataProxyService.getInstance().execute();
  }

  @Post('/')
  async postDummyData(@Body() postDummyDataRequest: PostDummyDataRequest): Promise<Dummy> {
    return this.createDummyDataProxyService.getInstance().execute(postDummyDataRequest.value);
  }
}
