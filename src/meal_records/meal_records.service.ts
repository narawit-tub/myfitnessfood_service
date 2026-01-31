import { Injectable } from '@nestjs/common';
import { CreateMealRecordDto } from './dto/create-meal_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealRecord } from './entities/meal_record.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MealRecordsService {
  constructor(
    @InjectRepository(MealRecord)
    private mealRecordRepository: Repository<MealRecord>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createMealRecordDto: CreateMealRecordDto) {
    try {
      const user = await this.userRepository.findOneBy({
        id: createMealRecordDto.userId,
      });
      if (!user) {
        throw new Error('User not found');
      }

      const mealRecord = this.mealRecordRepository.create({
        ...createMealRecordDto,
        user: user,
      });
      return await this.mealRecordRepository.save(mealRecord);
    } catch (error) {
      console.error('Error creating meal record:', error);
      throw error;
    }
  }

  findAll() {
    return this.mealRecordRepository.find();
  }

  findAllForUser(userId: number) {
    return this.mealRecordRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} mealRecord`;
  }
}
