import { ApiProperty } from '@nestjs/swagger';

export class CreateMealRecordDto {
  @ApiProperty({
    description: 'ID of the user recording the meal',
    example: 1,
    type: 'number',
  })
  userId: number;

  @ApiProperty({
    description: 'Name of the meal',
    example: 'Grilled Chicken Breast with Rice',
  })
  name: string;

  @ApiProperty({
    description: 'Protein content in grams',
    example: 45.5,
    type: 'number',
    minimum: 0,
  })
  protein_intake: number;

  @ApiProperty({
    description: 'Carbohydrate content in grams',
    example: 60.0,
    type: 'number',
    minimum: 0,
  })
  carb_intake: number;

  @ApiProperty({
    description: 'Fat content in grams',
    example: 12.5,
    type: 'number',
    minimum: 0,
  })
  fat_intake: number;
}
