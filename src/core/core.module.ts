import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configParser } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration module global
      load: [configParser],
    }),
  ],
})
export class CoreModule {}
