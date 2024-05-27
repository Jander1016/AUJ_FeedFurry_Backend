import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'pet_type'})
export class PetType {
  @PrimaryGeneratedColumn('uuid')
  pet_type_id : string;

  @Column({ name: 'description', length: 50, nullable: false })
  description: string;

  @Column({ name:'is_active', default: 1})
  is_active: number;
}
