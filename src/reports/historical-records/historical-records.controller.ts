import { Controller } from '@nestjs/common';
import { HistoricalRecordsService } from './historical-records.service';

@Controller('historical-records')
export class HistoricalRecordsController {
  constructor(private readonly historicalRecordsService: HistoricalRecordsService) {}
}
