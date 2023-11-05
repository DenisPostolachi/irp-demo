import { Module } from '@nestjs/common';
import { HistoricalRecordService } from './historical-record.service';
import { HistoricalRecordController } from './historical-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricalRecord } from './historical-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricalRecord])],
  controllers: [HistoricalRecordController],
  providers: [HistoricalRecordService],
})
export class HistoricalRecordModule {}
