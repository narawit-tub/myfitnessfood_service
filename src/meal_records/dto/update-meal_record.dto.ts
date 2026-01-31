import { PartialType } from '@nestjs/mapped-types';
import { CreateMealRecordDto } from './create-meal_record.dto';

export class UpdateMealRecordDto extends PartialType(CreateMealRecordDto) {}
