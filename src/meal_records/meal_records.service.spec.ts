import { Test, TestingModule } from '@nestjs/testing';
import { MealRecordsService } from './meal_records.service';

describe('MealRecordsService', () => {
  let service: MealRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealRecordsService],
    }).compile();

    service = module.get<MealRecordsService>(MealRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
