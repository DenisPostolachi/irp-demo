import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeLine } from '../graphs/timeline/timeline.entity';

@Injectable()
export class TimelineGraphSeederService {
  constructor(
    @InjectRepository(TimeLine)
    private readonly timeLineGraphRepository: Repository<TimeLine>,
  ) {}

  async seedMultipleTimeLineData(times: number): Promise<void> {
    const promises = [];
    for (let i = 0; i < times; i++) {
      promises.push(this.seedSingleGraph());
    }
    await Promise.all(promises);
  }

  private async seedSingleGraph(): Promise<TimeLine> {
    const reportData = {
      volume: Math.floor(Math.random() * 100),
    };

    return this.timeLineGraphRepository.save(reportData);
  }
}
