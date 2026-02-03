import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MealRecordsService } from './meal_records.service';
import { CreateMealRecordDto } from './dto/create-meal_record.dto';

@ApiTags('Meal Records')
@Controller('meal-records')
export class MealRecordsController {
  constructor(private readonly mealRecordsService: MealRecordsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a meal record',
    description:
      'Log a new meal with macronutrient information (protein, carbs, fat)',
  })
  @ApiResponse({
    status: 201,
    description: 'Meal record created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  create(@Body() createMealRecordDto: CreateMealRecordDto) {
    return this.mealRecordsService.create(createMealRecordDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all meal records',
    description: 'Retrieve all meal records across all users',
  })
  @ApiResponse({
    status: 200,
    description: 'List of meal records retrieved successfully',
  })
  findAll() {
    return this.mealRecordsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Get meal records by user',
    description: 'Retrieve all meal records for a specific user',
  })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'User meal records retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findAllForUser(@Param('userId') userId: string) {
    return this.mealRecordsService.findAllForUser(parseInt(userId));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get meal record by ID',
    description: 'Retrieve a specific meal record',
  })
  @ApiParam({
    name: 'id',
    description: 'Meal record ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Meal record retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Meal record not found',
  })
  findOne(@Param('id') id: string) {
    return this.mealRecordsService.findOne(+id);
  }
}
