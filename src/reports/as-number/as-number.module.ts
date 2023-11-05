import { Module } from '@nestjs/common';
import { AsNumberService } from './as-number.service';
import { AsNumberController } from './as-number.controller';
import { AsNumber } from './as-number.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AsNumber])],
  controllers: [AsNumberController],
  providers: [AsNumberService],
})
export class AsNumberModule {}
