import { Module } from '@nestjs/common';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [RestModule],
})
export class AppModule {}
