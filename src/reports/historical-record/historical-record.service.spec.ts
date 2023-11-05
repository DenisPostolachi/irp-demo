import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalRecordService } from './historical-record.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HistoricalRecord } from './historical-record.entity';
import { Repository } from 'typeorm';

describe('HistoricalRecordService', () => {
  let service: HistoricalRecordService;
  let mockRepository: Partial<Repository<HistoricalRecord>>;

  beforeEach(async () => {
    // Mock Repository
    mockRepository = {
      // Implement necessary functions of the repository that you use in your service
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoricalRecordService,
        {
          provide: getRepositoryToken(HistoricalRecord),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<HistoricalRecordService>(HistoricalRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
