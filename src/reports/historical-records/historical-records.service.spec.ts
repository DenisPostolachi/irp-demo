import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalRecordsService } from './historical-records.service';

describe('HistoricalRecordsService', () => {
  let service: HistoricalRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoricalRecordsService],
    }).compile();

    service = module.get<HistoricalRecordsService>(HistoricalRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
