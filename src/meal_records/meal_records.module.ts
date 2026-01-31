import { Module } from '@nestjs/common';
import { MealRecordsService } from './meal_records.service';
import { MealRecordsController } from './meal_records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRecord } from './entities/meal_record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MealRecord])],
  controllers: [MealRecordsController],
  providers: [MealRecordsService],
})
export class MealRecordsModule {}
