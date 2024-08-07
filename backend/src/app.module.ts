import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './modules/stats/stats.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    connectionName: 'main',
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('CONNECTION_STRING'),
      dbName: 'vmetrics'
    })
  }), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    connectionName: 'additional',
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('ADDITIONAL_CONNECTION_STRING'),
      dbName: 'dirol'
    })
  }), StatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
