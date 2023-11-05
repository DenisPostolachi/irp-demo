import { Controller, Get, Query } from '@nestjs/common';
import { AsNumberService } from './as-number.service';
import { AsNumber } from './as-number.entity';
import { PaginationResults } from './types/pagination-results.interface';

@Controller('reports/asnumber/')
export class AsNumberController {
  constructor(private readonly reportsService: AsNumberService) {}
  @Get()
  getReports(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('asName') asName?: string,
    @Query('asn') asn?: string,
  ): Promise<PaginationResults<AsNumber>> {
    return this.reportsService.getReports(page, pageSize, asName, asn);
  }
}
