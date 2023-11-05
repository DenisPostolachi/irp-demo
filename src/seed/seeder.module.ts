import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsNumber } from '../reports/as-number/as-number.entity';
import { TimeLine } from '../graphs/timeline/timeline.entity';
import { AsNumberSeederService } from './as-number.seeder.service';
import { TimelineGraphSeederService } from './timeline-graph.seeder.service';
import { HistoricalRecordSeederService } from './historical-record.seeder.service';
import { HistoricalRecord } from '../reports/historical-record/historical-record.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cornelius.db.elephantsql.com',
      port: 5432,
      username: 'bqyopfin',
      password: 'IpmZ4a2VEnBnsv_PKhL5KnGGcjqejSRc',
      database: 'bqyopfin',
      entities: [AsNumber, TimeLine, HistoricalRecord],
      synchronize: true,
      extra: {
        max: 1,
      },
    }),
    TypeOrmModule.forFeature([AsNumber, TimeLine, HistoricalRecord]),
  ],
  providers: [
    AsNumberSeederService,
    TimelineGraphSeederService,
    HistoricalRecordSeederService,
  ],
})
export class SeederModule {}
