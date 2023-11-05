import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsNumberModule } from './reports/as-number/as-number.module';
import { SeederModule } from './seed/seeder.module';
import { TimeLineModule } from './graphs/timeline/timeline.module';
import { HistoricalRecordsModule } from './reports/historical-records/historical-records.module';

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
    HistoricalRecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
