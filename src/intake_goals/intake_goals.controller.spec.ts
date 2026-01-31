import { Test, TestingModule } from '@nestjs/testing';
import { IntakeGoalsController } from './intake_goals.controller';
import { IntakeGoalsService } from './intake_goals.service';

describe('IntakeGoalsController', () => {
  let controller: IntakeGoalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntakeGoalsController],
      providers: [IntakeGoalsService],
    }).compile();

    controller = module.get<IntakeGoalsController>(IntakeGoalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
