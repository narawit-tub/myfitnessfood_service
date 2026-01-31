import { Test, TestingModule } from '@nestjs/testing';
import { IntakeGoalsService } from './intake_goals.service';

describe('IntakeGoalsService', () => {
  let service: IntakeGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntakeGoalsService],
    }).compile();

    service = module.get<IntakeGoalsService>(IntakeGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
