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
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginationResults<AsNumber>> {
    const queryBuilder = this.reportsRepository.createQueryBuilder('as_number');

    if (asName) {
      queryBuilder.andWhere('as_number.as_name ILIKE :asName', {
        asName: `%${asName}%`,
      });
    }

    if (asn) {
      queryBuilder.andWhere('as_number.asn = :asn', { asn });
    }

    queryBuilder.orderBy('as_number.created_at', sortOrder);

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
