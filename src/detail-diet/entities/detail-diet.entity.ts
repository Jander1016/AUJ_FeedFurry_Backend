import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { IsUUID, IsNotEmpty } from 'class-validator';
import { Diet } from 'src/diet/entities/diet.entity';
import { Food } from 'src/food/entities/food.entity';

@Entity()
export class DetailDiet {

  @PrimaryColumn()
  @IsUUID()
  @IsNotEmpty()
  diet_id: string;

  @PrimaryColumn()
  @IsUUID()
  @IsNotEmpty()
  food_id: string;
  
  @ManyToOne(() => Diet, (diet) => diet.detailDiets)
  @JoinColumn({ name: 'diet_id' })
  diet: Diet;

  @ManyToOne(() => Food)
  @JoinColumn({ name: 'food_id' })
  food: Food;
}

