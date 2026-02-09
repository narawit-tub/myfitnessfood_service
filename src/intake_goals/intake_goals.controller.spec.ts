import { Test, TestingModule } from '@nestjs/testing';
import { IntakeGoalsController } from './intake_goals.controller';
import { IntakeGoalsService } from './intake_goals.service';
import { CreateIntakeGoalDto } from './dto/create-intake_goal.dto';
import { UpdateIntakeGoalDto } from './dto/update-intake_goal.dto';
import { IntakeGoal } from './entities/intake_goal.entity';
import type { RequestWithUser } from 'src/auth/model';

describe('IntakeGoalsController', () => {
  let controller: IntakeGoalsController;
  let service: jest.Mocked<IntakeGoalsService>;

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

  const mockReq = {
    user: { id: 1, username: 'testuser' },
  } as RequestWithUser;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllByUserId: jest.fn(),
    findOne: jest.fn(),
    findByUserId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntakeGoalsController],
      providers: [
        {
          provide: IntakeGoalsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<IntakeGoalsController>(IntakeGoalsController);
    service = module.get(IntakeGoalsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an intake goal with userId from request', async () => {
      const createDto: CreateIntakeGoalDto = {
        userId: 999, // this should be overridden by req.user.id
        dailyProtein: 150,
        dailyCarbs: 250,
        dailyFat: 80,
        startDate: '2024-01-01',
      };

      mockService.create.mockResolvedValue(mockIntakeGoal);

      const result = await controller.create(createDto, mockReq);

      expect(service.create).toHaveBeenCalledWith({
        ...createDto,
        userId: 1, // from req.user.id
      });
      expect(result).toEqual(mockIntakeGoal);
    });
  });

  describe('findAll', () => {
    it('should return intake goals for the authenticated user', async () => {
      const intakeGoals = [mockIntakeGoal];
      mockService.findAllByUserId.mockResolvedValue(intakeGoals);

      const result = await controller.findAll(mockReq);

      expect(service.findAllByUserId).toHaveBeenCalledWith(1);
      expect(result).toEqual(intakeGoals);
    });
  });

  describe('findOne', () => {
    it('should return an intake goal by id', async () => {
      mockService.findOne.mockResolvedValue(mockIntakeGoal);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockIntakeGoal);
    });
  });

  describe('update', () => {
    it('should update an intake goal', async () => {
      const updateDto: UpdateIntakeGoalDto = {
        dailyProtein: 160,
      };

      const updatedGoal = { ...mockIntakeGoal, dailyProtein: 160 };
      mockService.update.mockResolvedValue(updatedGoal);

      const result = await controller.update('1', updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedGoal);
    });
  });

  describe('remove', () => {
    it('should remove an intake goal', async () => {
      mockService.remove.mockResolvedValue(undefined);

      await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
