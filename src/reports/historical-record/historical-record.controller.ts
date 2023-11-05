import { Controller, Get, Query } from '@nestjs/common';
import { HistoricalRecordService } from './historical-record.service';
import { PaginationResults } from '../as-number/types/pagination-results.interface';
import { HistoricalRecord } from './historical-record.entity';

@Controller('reports/historical-record')
export class HistoricalRecordController {
  constructor(
    private readonly historicalRecordsService: HistoricalRecordService,
  ) {}

  @Get()
  getReports(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('prefix') prefix: string,
  ): Promise<PaginationResults<HistoricalRecord>> {
    return this.historicalRecordsService.getReports(page, pageSize, prefix);
  }
}
