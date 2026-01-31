import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntakeGoalsService } from './intake_goals.service';
import { CreateIntakeGoalDto } from './dto/create-intake_goal.dto';
import { UpdateIntakeGoalDto } from './dto/update-intake_goal.dto';

@Controller('intake-goals')
export class IntakeGoalsController {
  constructor(private readonly intakeGoalsService: IntakeGoalsService) {}

  @Post()
  create(@Body() createIntakeGoalDto: CreateIntakeGoalDto) {
    return this.intakeGoalsService.create(createIntakeGoalDto);
  }

  @Get()
  findAll() {
    return this.intakeGoalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intakeGoalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntakeGoalDto: UpdateIntakeGoalDto) {
    return this.intakeGoalsService.update(+id, updateIntakeGoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intakeGoalsService.remove(+id);
  }
}
