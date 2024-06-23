import { Breed } from "src/breed/entities/breed.entity";
import { Pet } from "src/pet/entities/pet.entity";
import { Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'pet_type'})
export class PetType {
  @PrimaryGeneratedColumn('uuid')
  pet_type_id : string;

  @Column({ name: 'description', length: 50, nullable: false })
  description: string;
 
  @Column({ name:'is_active', default: 1})
  is_active: number;
   
  @OneToMany(() => Breed, breed => breed.petType)
  breeds: Breed[];

  @OneToMany(() =>Pet, pet=> pet.petType)
  pets: Pet[];
}
