import { Injectable } from '@nestjs/common';
import { CreateMealRecordDto } from './dto/create-meal_record.dto';
import { UpdateMealRecordDto } from './dto/update-meal_record.dto';

@Injectable()
export class MealRecordsService {
  create(createMealRecordDto: CreateMealRecordDto) {
    return 'This action adds a new mealRecord';
  }

  findAll() {
    return `This action returns all mealRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealRecord`;
  }

  update(id: number, updateMealRecordDto: UpdateMealRecordDto) {
    return `This action updates a #${id} mealRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealRecord`;
  }
}
