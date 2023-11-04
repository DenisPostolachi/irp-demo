import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';
import { PaginationResults } from './types/pagination-results.interface';

@Controller('reports/asnumber/')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  @Get()
  getReports(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('asName') asName?: string,
  ): Promise<PaginationResults<Report>> {
    return this.reportsService.getReports(page, pageSize, asName);
  }
}
