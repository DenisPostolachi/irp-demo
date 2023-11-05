import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricalRecord } from './historical-record.entity';
import { Repository } from 'typeorm';
import { PaginationResults } from './types/pagination-results.interface';

@Injectable()
export class HistoricalRecordService {
  constructor(
    @InjectRepository(HistoricalRecord)
    private historicalRecordRepository: Repository<HistoricalRecord>,
  ) {}

  async getReports(
    page = 1,
    pageSize = 10,
    prefix: string,
  ): Promise<PaginationResults<HistoricalRecord>> {
    const queryBuilder =
      this.historicalRecordRepository.createQueryBuilder('historical_record');

    if (prefix) {
      queryBuilder.andWhere('historical_record.prefix ILIKE :prefix', {
        prefix: `%${prefix}%`,
      });
    }

    queryBuilder.take(pageSize);
    queryBuilder.skip((page - 1) * pageSize);

    const [results, total] = await queryBuilder.getManyAndCount();

    return {
      data: [results],
      headers: Object.keys(results[0]),
      count: total,
      currentPage: page,
      nextPage: total > page * pageSize ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      lastPage: Math.ceil(total / pageSize),
    };
  }
}
