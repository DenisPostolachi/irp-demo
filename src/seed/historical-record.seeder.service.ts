import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricalRecord } from '../modules/reports/historical-record/historical-record.entity';
import { generateRandomIP, generateRandomString } from '../helpers/helpers';

@Injectable()
export class HistoricalRecordSeederService {
  constructor(
    @InjectRepository(HistoricalRecord)
    private readonly historicalRecordRepository: Repository<HistoricalRecord>,
  ) {}

  async seedMultipleReports(times: number): Promise<void> {
    const promises = [];
    for (let i = 0; i < times; i++) {
      promises.push(this.seedSingleReport());
    }
    await Promise.all(promises);
  }

  private async seedSingleReport(): Promise<HistoricalRecord> {
    const reportData = {
      prefix: generateRandomIP(),
      volume: Math.floor(Math.random() * 100),
      asn: Math.floor(Math.random() * 10000),
      loss_to: Math.floor(Math.random() * 1000),
      loss_from: Math.floor(Math.random() * 1000),
      latency_to: Math.floor(Math.random() * 1000),
      latency_from: Math.floor(Math.random() * 1000),
      type: generateRandomString(80),
    };

    return this.historicalRecordRepository.save(reportData);
  }
}
