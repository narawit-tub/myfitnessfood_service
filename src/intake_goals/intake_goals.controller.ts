import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { IntakeGoalsService } from './intake_goals.service';
import { CreateIntakeGoalDto } from './dto/create-intake_goal.dto';
import { UpdateIntakeGoalDto } from './dto/update-intake_goal.dto';
import { IntakeGoal } from './entities/intake_goal.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { RequestWithUser } from 'src/auth/model';

@ApiTags('Intake Goals')
@Controller('intake-goals')
@UseGuards(JwtAuthGuard)
export class IntakeGoalsController {
  constructor(private readonly intakeGoalsService: IntakeGoalsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create an intake goal',
    description:
      'Set daily nutrition goals for a user (calories, protein, carbs, fat)',
  })
  @ApiResponse({
    status: 201,
    description: 'Intake goal created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  create(
    @Body() createIntakeGoalDto: CreateIntakeGoalDto,
    @Req() req: RequestWithUser,
  ) {
    return this.intakeGoalsService.create({
      ...createIntakeGoalDto,
      userId: req.user.id,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'Get all intake goals',
    description: 'Retrieve all intake goals',
  })
  @ApiResponse({
    status: 200,
    description: 'List of intake goals retrieved successfully',
  })
  findAll(@Req() req: RequestWithUser): Promise<IntakeGoal[]> {
    return this.intakeGoalsService.findAllByUserId(req.user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get intake goal by ID',
    description: 'Retrieve a specific intake goal',
  })
  @ApiParam({
    name: 'id',
    description: 'Intake goal ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Intake goal retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Intake goal not found',
  })
  findOne(@Param('id') id: string) {
    return this.intakeGoalsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update intake goal',
    description: 'Update an existing intake goal',
  })
  @ApiParam({
    name: 'id',
    description: 'Intake goal ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Intake goal updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 404,
    description: 'Intake goal not found',
  })
  update(
    @Param('id') id: string,
    @Body() updateIntakeGoalDto: UpdateIntakeGoalDto,
  ) {
    return this.intakeGoalsService.update(+id, updateIntakeGoalDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete intake goal',
    description: 'Delete an existing intake goal',
  })
  @ApiParam({
    name: 'id',
    description: 'Intake goal ID',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Intake goal deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Intake goal not found',
  })
  remove(@Param('id') id: string) {
    return this.intakeGoalsService.remove(+id);
  }
}
