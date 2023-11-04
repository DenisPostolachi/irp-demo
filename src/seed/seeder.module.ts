import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '../reports/asNumber/report.entity';
import { ReportSeederService } from './report.seeder.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser',
      password: 'pass123',
      database: 'mydb',
      entities: [Report],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Report]),
  ],
  providers: [ReportSeederService],
})
export class SeederModule {}
