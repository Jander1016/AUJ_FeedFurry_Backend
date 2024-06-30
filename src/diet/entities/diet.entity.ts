import { IsNumber, IsUUID } from "class-validator";
import { DetailDiet } from "src/detail-diet/entities/detail-diet.entity";
import { Pet } from "src/pet/entities/pet.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('diet')
export class Diet {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  diet_id: string;

  @Column({ name: 'pet_id', length: 40, nullable: false })
  @IsUUID() 
  pet_id: string;
  
  @Column({ name: 'is_active',default: 1})
  @IsNumber()
  is_active: number;
  
  @ManyToOne(()=> Pet, pet => pet.diets)
  @JoinColumn({ name: 'pet_id'})
  pet: Pet;

  @OneToMany(()=>DetailDiet, detailDiet => detailDiet.diet)
  detailDiets: DetailDiet[];
}
