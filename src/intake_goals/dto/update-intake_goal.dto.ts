import { PartialType } from '@nestjs/swagger';
import { CreateIntakeGoalDto } from './create-intake_goal.dto';

export class UpdateIntakeGoalDto extends PartialType(CreateIntakeGoalDto) {}
