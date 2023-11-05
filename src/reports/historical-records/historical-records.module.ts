import { Module } from '@nestjs/common';
import { HistoricalRecordsService } from './historical-records.service';
import { HistoricalRecordsController } from './historical-records.controller';

@Module({
  controllers: [HistoricalRecordsController],
  providers: [HistoricalRecordsService],
})
export class HistoricalRecordsModule {}
