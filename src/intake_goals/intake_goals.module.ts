import { Module } from '@nestjs/common';
import { IntakeGoalsService } from './intake_goals.service';
import { IntakeGoalsController } from './intake_goals.controller';

@Module({
  controllers: [IntakeGoalsController],
  providers: [IntakeGoalsService],
})
export class IntakeGoalsModule {}
