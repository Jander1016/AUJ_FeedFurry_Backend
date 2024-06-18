import { PetType } from "src/pet-type/entities/pet-type.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'breed'})
export class Breed {

  @PrimaryGeneratedColumn("uuid")
  breed_id: string;

  @Column({name: "description", length: 50, nullable: false})
  description: string;

  @Column({name: "is_active", default: 1})
  is_active: number;

  @Column({name: "pet_type_id"})
  pet_type_id: string;

  @ManyToOne(() => PetType, (petType) => petType.breeds)
  @JoinColumn({ name: 'pet_type_id' })
  petType: PetType;

}
