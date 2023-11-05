import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TimeLine } from './timeline.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimeLineService {
  constructor(
    @InjectRepository(TimeLine)
    private timeLineGraphRepository: Repository<TimeLine>,
  ) {}

  async getTimeLineGraph(
    start?: Date,
    end?: Date,
  ): Promise<{ data: TimeLine[][] }> {
    const queryBuilder =
      this.timeLineGraphRepository.createQueryBuilder('time_line');

    if (start) {
      queryBuilder.andWhere('time_line.created_at >= :start', {
        start,
      });
    }

    if (end) {
      queryBuilder.andWhere('time_line.created_at <= :end', { end });
    }

    const results = await queryBuilder.getMany();
    return {
      data: [results],
    };
  }
}
