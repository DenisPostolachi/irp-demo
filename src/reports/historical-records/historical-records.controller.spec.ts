import { Test, TestingModule } from '@nestjs/testing';
import { HistoricalRecordsController } from './historical-records.controller';
import { HistoricalRecordsService } from './historical-records.service';

describe('HistoricalRecordsController', () => {
  let controller: HistoricalRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoricalRecordsController],
      providers: [HistoricalRecordsService],
    }).compile();

    controller = module.get<HistoricalRecordsController>(HistoricalRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
