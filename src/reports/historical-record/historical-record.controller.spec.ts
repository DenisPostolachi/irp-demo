import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalRecordController } from './historical-record.controller';
import { HistoricalRecordService } from './historical-record.service';

describe('HistoricalRecordsController', () => {
  let controller: HistoricalRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalRecordController],
      providers: [HistoricalRecordService],
    }).compile();

    controller = module.get<HistoricalRecordController>(
      HistoricalRecordController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
