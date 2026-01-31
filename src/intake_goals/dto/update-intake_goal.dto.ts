import { PartialType } from '@nestjs/mapped-types';
import { CreateIntakeGoalDto } from './create-intake_goal.dto';

export class UpdateIntakeGoalDto extends PartialType(CreateIntakeGoalDto) {}
