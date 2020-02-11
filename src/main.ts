import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/app.module';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  const port: string = app.get(EnvironmentConfigService).get('PORT');
  await app.listen(port);
}
bootstrap();
