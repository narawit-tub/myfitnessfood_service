import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { IntakeGoalsService } from './intake_goals.service';
import { IntakeGoal } from './entities/intake_goal.entity';
import { CreateIntakeGoalDto } from './dto/create-intake_goal.dto';
import { UpdateIntakeGoalDto } from './dto/update-intake_goal.dto';

describe('IntakeGoalsService', () => {
  let service: IntakeGoalsService;
  let repository: jest.Mocked<Repository<IntakeGoal>>;

  const mockIntakeGoal: IntakeGoal = {
    id: 1,
    userId: 1,
    dailyProtein: 150,
    dailyCarbs: 250,
    dailyFat: 80,
    startDate: new Date('2024-01-01'),
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    user: { id: 1, username: 'testuser' } as any,
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntakeGoalsService,
        {
          provide: getRepositoryToken(IntakeGoal),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<IntakeGoalsService>(IntakeGoalsService);
    repository = module.get(getRepositoryToken(IntakeGoal));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an intake goal', async () => {
      const createDto: CreateIntakeGoalDto = {
        userId: 1,
        dailyProtein: 150,
        dailyCarbs: 250,
        dailyFat: 80,
        startDate: '2024-01-01',
      };

      mockRepository.create.mockReturnValue(mockIntakeGoal);
      mockRepository.save.mockResolvedValue(mockIntakeGoal);

      const result = await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createDto,
        startDate: new Date(createDto.startDate),
        endDate: null,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockIntakeGoal);
      expect(result).toEqual(mockIntakeGoal);
    });

    it('should create an intake goal with end date', async () => {
      const createDto: CreateIntakeGoalDto = {
        userId: 1,
        dailyProtein: 150,
        dailyCarbs: 250,
        dailyFat: 80,
        startDate: '2024-01-01',
        endDate: '2024-06-30',
      };

      mockRepository.create.mockReturnValue(mockIntakeGoal);
      mockRepository.save.mockResolvedValue(mockIntakeGoal);

      await service.create(createDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createDto,
        startDate: new Date(createDto.startDate),
        endDate: new Date(createDto.endDate),
      });
    });
  });

  describe('findAll', () => {
    it('should return all intake goals', async () => {
      const intakeGoals = [mockIntakeGoal];
      mockRepository.find.mockResolvedValue(intakeGoals);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({ relations: ['user'] });
      expect(result).toEqual(intakeGoals);
    });
  });

  describe('findOne', () => {
    it('should return an intake goal by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockIntakeGoal);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['user'],
      });
      expect(result).toEqual(mockIntakeGoal);
    });

    it('should throw NotFoundException if intake goal not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByUserId', () => {
    it('should return intake goals for a user', async () => {
      const intakeGoals = [mockIntakeGoal];
      mockRepository.find.mockResolvedValue(intakeGoals);

      const result = await service.findByUserId(1);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { userId: 1 },
        order: { startDate: 'DESC' },
      });
      expect(result).toEqual(intakeGoals);
    });
  });

  describe('update', () => {
    it('should update an intake goal', async () => {
      const updateDto: UpdateIntakeGoalDto = {
        dailyProtein: 160,
      };

      const updatedGoal = { ...mockIntakeGoal, dailyProtein: 160 };
      mockRepository.findOne.mockResolvedValue(mockIntakeGoal);
      mockRepository.save.mockResolvedValue(updatedGoal);

      const result = await service.update(1, updateDto);

      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toEqual(updatedGoal);
    });

    it('should throw NotFoundException if intake goal not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove an intake goal', async () => {
      mockRepository.findOne.mockResolvedValue(mockIntakeGoal);
      mockRepository.remove.mockResolvedValue(mockIntakeGoal);

      await service.remove(1);

      expect(mockRepository.remove).toHaveBeenCalledWith(mockIntakeGoal);
    });

    it('should throw NotFoundException if intake goal not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
