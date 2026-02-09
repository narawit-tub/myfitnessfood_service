import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntakeGoalsService } from './intake_goals.service';
import { IntakeGoalsController } from './intake_goals.controller';
import { IntakeGoal } from './entities/intake_goal.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([IntakeGoal]), AuthModule],
  controllers: [IntakeGoalsController],
  providers: [IntakeGoalsService],
  exports: [IntakeGoalsService],
})
export class IntakeGoalsModule {}
