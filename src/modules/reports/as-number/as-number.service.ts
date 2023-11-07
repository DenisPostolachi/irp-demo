import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AsNumber } from './as-number.entity';
import { AsNumberParamsDto } from './dto/as-number-params.dto';

@Injectable()
export class AsNumberService {
  constructor(
    @InjectRepository(AsNumber)
    private reportsRepository: Repository<AsNumber>,
  ) {}

  async getAsNumberData(asNumberParamsDto: AsNumberParamsDto) {
    try {
      const queryBuilder = this.createQueryBuilder(asNumberParamsDto);
      const [results, total] = await queryBuilder.getManyAndCount();
      return this.formatPaginationResults(results, total, asNumberParamsDto);
    } catch (error) {
      throw new Error('Error fetching AS number data');
    }
  }

  private createQueryBuilder(params: AsNumberParamsDto) {
    const { asName, asn, sortOrder, page, pageSize } = params;
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

    return queryBuilder;
  }

  private formatPaginationResults(
    results: AsNumber[],
    total: number,
    params: AsNumberParamsDto,
  ) {
    const { page, pageSize } = params;
    return {
      data: results,
      headers: results.length > 0 ? Object.keys(results[0]) : [],
      count: total,
      currentPage: page,
      nextPage: total > page * pageSize ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      lastPage: Math.ceil(total / pageSize),
    };
  }
}
