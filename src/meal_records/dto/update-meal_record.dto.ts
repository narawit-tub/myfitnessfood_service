import { PartialType } from '@nestjs/swagger';
import { CreateMealRecordDto } from './create-meal_record.dto';

export class UpdateMealRecordDto extends PartialType(CreateMealRecordDto) {}
