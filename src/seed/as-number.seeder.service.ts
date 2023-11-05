import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AsNumber } from '../reports/as-number/as-number.entity';
import { generateRandomString } from '../helpers/helpers';

@Injectable()
export class AsNumberSeederService {
  constructor(
    @InjectRepository(AsNumber)
    private readonly reportRepository: Repository<AsNumber>,
  ) {}

  async seedMultipleReports(times: number): Promise<void> {
    const promises = [];
    for (let i = 0; i < times; i++) {
      promises.push(this.seedSingleReport());
    }
    await Promise.all(promises);
  }

  private async seedSingleReport(): Promise<AsNumber> {
    const reportData = {
      as_name: generateRandomString(10),
      volume: Math.floor(Math.random() * 10000),
      asn: Math.floor(Math.random() * 10000),
      improvements: Math.floor(Math.random() * 100),
      inbound: Math.floor(Math.random() * 100),
      outbound: Math.floor(Math.random() * 100),
    };

    return this.reportRepository.save(reportData);
  }
}
