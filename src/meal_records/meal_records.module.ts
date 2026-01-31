import { Module } from '@nestjs/common';
import { MealRecordsService } from './meal_records.service';
import { MealRecordsController } from './meal_records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealRecord } from './entities/meal_record.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MealRecord]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [MealRecordsController],
  providers: [MealRecordsService],
})
export class MealRecordsModule {}
