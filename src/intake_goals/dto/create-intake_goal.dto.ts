import { ApiProperty } from '@nestjs/swagger';

export class CreateIntakeGoalDto {
  @ApiProperty({
    description: 'ID of the user setting the goal',
    example: 1,
    type: 'number',
  })
  userId: number;

  @ApiProperty({
    description: 'Target daily calorie intake',
    example: 2500,
    type: 'number',
    minimum: 0,
  })
  dailyCalories: number;

  @ApiProperty({
    description: 'Target daily protein intake in grams',
    example: 150,
    type: 'number',
    minimum: 0,
  })
  dailyProtein: number;

  @ApiProperty({
    description: 'Target daily carbohydrate intake in grams',
    example: 250,
    type: 'number',
    minimum: 0,
  })
  dailyCarbs: number;

  @ApiProperty({
    description: 'Target daily fat intake in grams',
    example: 80,
    type: 'number',
    minimum: 0,
  })
  dailyFat: number;

  @ApiProperty({
    description: 'Start date for this goal',
    example: '2024-01-01',
    type: 'string',
    format: 'date',
  })
  startDate: string;

  @ApiProperty({
    description: 'End date for this goal (optional)',
    example: '2024-06-30',
    type: 'string',
    format: 'date',
    required: false,
  })
  endDate?: string;
}
