import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsNumber } from '../reports/as-number/as-number.entity';
import { TimeLine } from '../graphs/timeline/timeline.entity';
import { AsNumberSeederService } from './as-number.seeder.service';
import { TimelineGraphSeederService } from './timeline-graph.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cornelius.db.elephantsql.com',
      port: 5432,
      username: 'bqyopfin',
      password: 'IpmZ4a2VEnBnsv_PKhL5KnGGcjqejSRc',
      database: 'bqyopfin',
      entities: [AsNumber, TimeLine],
      synchronize: true,
      extra: {
        max: 5,
      },
    }),
    TypeOrmModule.forFeature([AsNumber, TimeLine]),
  ],
  providers: [AsNumberSeederService, TimelineGraphSeederService],
})
export class SeederModule {}
