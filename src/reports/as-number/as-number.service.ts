import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsNumber } from './as-number.entity';
import { PaginationResults } from './types/pagination-results.interface';

@Injectable()
export class AsNumberService {
  constructor(
    @InjectRepository(AsNumber)
    private reportsRepository: Repository<AsNumber>,
  ) {}

  async getReports(
    page = 1,
    pageSize = 10,
    asName?: string,
    asn?: string,
  ): Promise<PaginationResults<AsNumber>> {
    const queryBuilder = this.reportsRepository.createQueryBuilder('report');

    if (asName) {
      queryBuilder.andWhere('report.as_name ILIKE :asName', {
        asName: `%${asName}%`,
      });
    }

    if (asn) {
      queryBuilder.andWhere('report.asn = :asn', { asn });
    }

    queryBuilder.take(pageSize);
    queryBuilder.skip((page - 1) * pageSize);

    const [results, total] = await queryBuilder.getManyAndCount();

    return {
      data: [results],
      count: total,
      currentPage: page,
      nextPage: total > page * pageSize ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      lastPage: Math.ceil(total / pageSize),
    };
  }
}
