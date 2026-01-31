import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealRecordsService } from './meal_records.service';
import { CreateMealRecordDto } from './dto/create-meal_record.dto';
import { UpdateMealRecordDto } from './dto/update-meal_record.dto';

@Controller('meal-records')
export class MealRecordsController {
  constructor(private readonly mealRecordsService: MealRecordsService) {}

  @Post()
  create(@Body() createMealRecordDto: CreateMealRecordDto) {
    return this.mealRecordsService.create(createMealRecordDto);
  }

  @Get()
  findAll() {
    return this.mealRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealRecordDto: UpdateMealRecordDto) {
    return this.mealRecordsService.update(+id, updateMealRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealRecordsService.remove(+id);
  }
}
