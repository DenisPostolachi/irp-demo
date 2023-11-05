import { Module } from '@nestjs/common';
import { AsNumberService } from './as-number.service';
import { AsNumberController } from './as-number.controller';
import { Report } from './as-number.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [AsNumberController],
  providers: [AsNumberService],
})
export class AsNumberModule {}
