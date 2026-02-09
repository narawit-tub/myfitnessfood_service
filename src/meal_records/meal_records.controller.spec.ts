import { Test, TestingModule } from '@nestjs/testing';
import { MealRecordsController } from './meal_records.controller';
import { MealRecordsService } from './meal_records.service';
import { CreateMealRecordDto } from './dto/create-meal_record.dto';
import { MealRecord } from './entities/meal_record.entity';

describe('MealRecordsController', () => {
  let controller: MealRecordsController;
  let service: jest.Mocked<MealRecordsService>;

  const mockMealRecord: MealRecord = {
    id: 1,
    name: 'Grilled Chicken Breast with Rice',
    protein_intake: 45.5,
    carb_intake: 60.0,
    fat_intake: 12.5,
    created_at: new Date(),
    user: { id: 1, username: 'johndoe' } as any,
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllForUser: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealRecordsController],
      providers: [
        {
          provide: MealRecordsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MealRecordsController>(MealRecordsController);
    service = module.get(MealRecordsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a meal record', async () => {
      const createDto: CreateMealRecordDto = {
        userId: 1,
        name: 'Grilled Chicken Breast with Rice',
        protein_intake: 45.5,
        carb_intake: 60.0,
        fat_intake: 12.5,
      };

      mockService.create.mockResolvedValue(mockMealRecord);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockMealRecord);
    });
  });

  describe('findAll', () => {
    it('should return all meal records', async () => {
      const records = [mockMealRecord];
      mockService.findAll.mockResolvedValue(records);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(records);
    });
  });

  describe('findAllForUser', () => {
    it('should return meal records for a user (string param parsed to int)', async () => {
      const records = [mockMealRecord];
      mockService.findAllForUser.mockResolvedValue(records);

      const result = await controller.findAllForUser('1');

      expect(service.findAllForUser).toHaveBeenCalledWith(1);
      expect(result).toEqual(records);
    });
  });

  describe('findOne', () => {
    it('should return a meal record by id (string param converted to number)', () => {
      mockService.findOne.mockReturnValue(
        'This action returns a #1 mealRecord',
      );

      const result = controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe('This action returns a #1 mealRecord');
    });
  });
});
