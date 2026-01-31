import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MealRecordsModule } from './meal_records/meal_records.module';
import { IntakeGoalsModule } from './intake_goals/intake_goals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    MealRecordsModule,
    IntakeGoalsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // using 'postgres' as host if using Docker
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'myapp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
