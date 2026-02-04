import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class MealRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  protein_intake: number;

  @Column()
  carb_intake: number;

  @Column()
  fat_intake: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.mealRecords)
  user: User;
}
