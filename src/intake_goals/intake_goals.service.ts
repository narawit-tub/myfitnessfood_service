import { Injectable } from '@nestjs/common';
import { CreateIntakeGoalDto } from './dto/create-intake_goal.dto';
import { UpdateIntakeGoalDto } from './dto/update-intake_goal.dto';

@Injectable()
export class IntakeGoalsService {
  create(createIntakeGoalDto: CreateIntakeGoalDto) {
    return 'This action adds a new intakeGoal';
  }

  findAll() {
    return `This action returns all intakeGoals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intakeGoal`;
  }

  update(id: number, updateIntakeGoalDto: UpdateIntakeGoalDto) {
    return `This action updates a #${id} intakeGoal`;
  }

  remove(id: number) {
    return `This action removes a #${id} intakeGoal`;
  }
}
