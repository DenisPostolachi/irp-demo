import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsNumberModule } from './modules/reports/as-number/as-number.module';
import { SeederModule } from './seed/seeder.module';
import { TimeLineModule } from './modules/graphs/timeline/timeline.module';
import { HistoricalRecordModule } from './modules/reports/historical-record/historical-record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'cornelius.db.elephantsql.com',
      port: 5432,
      username: 'bqyopfin',
      password: 'IpmZ4a2VEnBnsv_PKhL5KnGGcjqejSRc',
      database: 'bqyopfin',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AsNumberModule,
    TimeLineModule,
    SeederModule,
    HistoricalRecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
