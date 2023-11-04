import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '../reports/asNumber/report.entity';

@Injectable()
export class ReportSeederService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  async seedMultipleReports(times: number): Promise<void> {
    const promises = [];
    for (let i = 0; i < times; i++) {
      promises.push(this.seedSingleReport());
    }
    await Promise.all(promises);
  }

  private async seedSingleReport(): Promise<Report> {
    const reportData = {
      as_name: this.generateRandomString(10),
      volume: Math.floor(Math.random() * 10000),
      asn: Math.floor(Math.random() * 10000),
      improvements: Math.floor(Math.random() * 100),
      inbound: Math.floor(Math.random() * 100),
      outbound: Math.floor(Math.random() * 100),
    };

    return this.reportRepository.save(reportData);
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
