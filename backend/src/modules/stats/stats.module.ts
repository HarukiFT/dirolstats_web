import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { LogSchema } from './schemas/log.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SkinSchema } from './schemas/skin.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Log', schema: LogSchema}], 'main'), MongooseModule.forFeature([{name: 'Skin', schema: SkinSchema}], 'additional')],
  providers: [StatsService],
  controllers: [StatsController]
})
export class StatsModule {}
