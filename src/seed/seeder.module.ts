import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../reports/as-number/as-number.entity';
import { TimeLine } from '../graphs/timeline/timeline.entity';
import { AsNumberSeederService } from './as-number.seeder.service';
import { TimelineGraphSeederService } from './timeline-graph.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'pass123',
      database: 'mydb',
      entities: [Report, TimeLine],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Report, TimeLine]),
  ],
  providers: [AsNumberSeederService, TimelineGraphSeederService],
})
export class SeederModule {}
