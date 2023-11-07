import { Controller, Get, Query } from '@nestjs/common';
import { AsNumberService } from './as-number.service';
import { AsNumber } from './as-number.entity';
import { PaginationResults } from './types/pagination-results.interface';
import { AsNumberParamsDto } from './dto/as-number-params.dto';

@Controller('reports/asnumber/')
export class AsNumberController {
  constructor(private readonly reportsService: AsNumberService) {}
  @Get()
  getReports(
    @Query() asNumberParamsDto: AsNumberParamsDto,
  ): Promise<PaginationResults<AsNumber>> {
    return this.reportsService.getAsNumberData(asNumberParamsDto);
  }
}
