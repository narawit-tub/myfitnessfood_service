import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIntakeGoalDto } from './dto/create-intake_goal.dto';
import { UpdateIntakeGoalDto } from './dto/update-intake_goal.dto';
import { IntakeGoal } from './entities/intake_goal.entity';

@Injectable()
export class IntakeGoalsService {
  constructor(
    @InjectRepository(IntakeGoal)
    private intakeGoalRepository: Repository<IntakeGoal>,
  ) {}

  async create(createIntakeGoalDto: CreateIntakeGoalDto): Promise<IntakeGoal> {
    const intakeGoal = this.intakeGoalRepository.create({
      ...createIntakeGoalDto,
      startDate: new Date(createIntakeGoalDto.startDate),
      endDate: createIntakeGoalDto.endDate
        ? new Date(createIntakeGoalDto.endDate)
        : null,
    });
    return this.intakeGoalRepository.save(intakeGoal);
  }

  async findAll(): Promise<IntakeGoal[]> {
    return this.intakeGoalRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<IntakeGoal> {
    const intakeGoal = await this.intakeGoalRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!intakeGoal) {
      throw new NotFoundException(`Intake goal with ID ${id} not found`);
    }
    return intakeGoal;
  }

  async findByUserId(userId: number): Promise<IntakeGoal[]> {
    return this.intakeGoalRepository.find({
      where: { userId },
      order: { startDate: 'DESC' },
    });
  }

  async update(
    id: number,
    updateIntakeGoalDto: UpdateIntakeGoalDto,
  ): Promise<IntakeGoal> {
    const intakeGoal = await this.findOne(id);
    if (!intakeGoal) {
      throw new NotFoundException(`Intake goal with ID ${id} not found`);
    }

    const startDate = updateIntakeGoalDto.startDate
      ? new Date(updateIntakeGoalDto.startDate)
      : intakeGoal.startDate;
    const endDate = updateIntakeGoalDto.endDate
      ? new Date(updateIntakeGoalDto.endDate)
      : intakeGoal.endDate;

    const updateData: Partial<IntakeGoal> = {
      ...updateIntakeGoalDto,
      startDate,
      endDate,
    };

    Object.assign(intakeGoal, updateData);
    intakeGoal.updatedAt = new Date();

    return this.intakeGoalRepository.save(intakeGoal);
  }

  async remove(id: number): Promise<void> {
    const intakeGoal = await this.findOne(id);
    await this.intakeGoalRepository.remove(intakeGoal);
  }
}
