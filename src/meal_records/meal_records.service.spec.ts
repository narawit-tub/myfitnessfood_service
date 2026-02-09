import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealRecordsService } from './meal_records.service';
import { MealRecord } from './entities/meal_record.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateMealRecordDto } from './dto/create-meal_record.dto';

describe('MealRecordsService', () => {
  let service: MealRecordsService;
  let mealRecordRepository: jest.Mocked<Repository<MealRecord>>;
  let userRepository: jest.Mocked<Repository<User>>;

  const mockUser: User = {
    id: 1,
    username: 'johndoe',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    isActive: true,
    mealRecords: [],
  };

  const mockMealRecord: MealRecord = {
    id: 1,
    name: 'Grilled Chicken Breast with Rice',
    protein_intake: 45.5,
    carb_intake: 60.0,
    fat_intake: 12.5,
    created_at: new Date(),
    user: mockUser,
  };

  const mockMealRecordRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockUserRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MealRecordsService,
        {
          provide: getRepositoryToken(MealRecord),
          useValue: mockMealRecordRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<MealRecordsService>(MealRecordsService);
    mealRecordRepository = module.get(getRepositoryToken(MealRecord));
    userRepository = module.get(getRepositoryToken(User));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a meal record for an existing user', async () => {
      const createDto: CreateMealRecordDto = {
        userId: 1,
        name: 'Grilled Chicken Breast with Rice',
        protein_intake: 45.5,
        carb_intake: 60.0,
        fat_intake: 12.5,
      };

      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockMealRecordRepository.create.mockReturnValue(mockMealRecord);
      mockMealRecordRepository.save.mockResolvedValue(mockMealRecord);

      const result = await service.create(createDto);

      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockMealRecordRepository.create).toHaveBeenCalledWith({
        ...createDto,
        user: mockUser,
      });
      expect(mockMealRecordRepository.save).toHaveBeenCalledWith(
        mockMealRecord,
      );
      expect(result).toEqual(mockMealRecord);
    });

    it('should throw an error when user is not found', async () => {
      const createDto: CreateMealRecordDto = {
        userId: 999,
        name: 'Grilled Chicken',
        protein_intake: 45.5,
        carb_intake: 60.0,
        fat_intake: 12.5,
      };

      mockUserRepository.findOneBy.mockResolvedValue(null);

      await expect(service.create(createDto)).rejects.toThrow('User not found');
    });
  });

  describe('findAll', () => {
    it('should return all meal records', async () => {
      const records = [mockMealRecord];
      mockMealRecordRepository.find.mockResolvedValue(records);

      const result = await service.findAll();

      expect(mockMealRecordRepository.find).toHaveBeenCalled();
      expect(result).toEqual(records);
    });
  });

  describe('findAllForUser', () => {
    it('should return meal records for a specific user', async () => {
      const records = [mockMealRecord];
      mockMealRecordRepository.find.mockResolvedValue(records);

      const result = await service.findAllForUser(1);

      expect(mockMealRecordRepository.find).toHaveBeenCalledWith({
        where: { user: { id: 1 } },
      });
      expect(result).toEqual(records);
    });
  });

  describe('findOne', () => {
    it('should return a placeholder string', () => {
      const result = service.findOne(1);

      expect(result).toBe('This action returns a #1 mealRecord');
    });
  });
});
