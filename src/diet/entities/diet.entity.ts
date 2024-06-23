import { Food } from "src/food/entities/food.entity";
import { Pet } from "src/pet/entities/pet.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('diet')
export class Diet {

  @PrimaryGeneratedColumn('uuid')
  diet_id: string;

  @Column({ name: 'pet_id', length: 40, nullable: false })
  pet_id: string;
  
  @ManyToOne(()=> Pet, pet => pet.diets)
  @JoinColumn({ name: 'pet_id'})
  pet: Pet;

  @Column({ name: 'food_id', length: 40, nullable: false })
  food_id: string;

  @ManyToOne(()=> Food, food => food.diets)
  @JoinColumn({ name: 'food_id'})
  food: Food;
}
