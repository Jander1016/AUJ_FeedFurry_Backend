import { IsNumber, IsUUID } from "class-validator";
import { Pet } from "src/pet/entities/pet.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('diet')
export class Diet {

  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  diet_id: string;

  @Column({ name: 'pet_id', length: 40, nullable: false })
  @IsUUID() 
  pet_id: string;
  
  @ManyToOne(()=> Pet, pet => pet.diets)
  @JoinColumn({ name: 'pet_id'})
  pet: Pet;

  @Column({ name: 'is_Active', nullable: false })
  @IsNumber()
  is_active: number;
}
