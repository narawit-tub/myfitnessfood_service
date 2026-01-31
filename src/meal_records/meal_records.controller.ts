import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MealRecordsService } from './meal_records.service';
import { CreateMealRecordDto } from './dto/create-meal_record.dto';

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

  @Get('user/:userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.mealRecordsService.findAllForUser(parseInt(userId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealRecordsService.findOne(+id);
  }
}
