import { Test, TestingModule } from '@nestjs/testing';
import { MealRecordsController } from './meal_records.controller';
import { MealRecordsService } from './meal_records.service';

describe('MealRecordsController', () => {
  let controller: MealRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealRecordsController],
      providers: [MealRecordsService],
    }).compile();

    controller = module.get<MealRecordsController>(MealRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
