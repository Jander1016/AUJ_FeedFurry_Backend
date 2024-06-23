import { Pet } from "src/pet/entities/pet.entity";
import { Column,   Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'activities'})
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  activity_id: string;

  @Column({ name: 'description', length: 50, nullable: false })
  description: string;

  @Column({ name: 'factor_value', type: 'decimal', precision: 10, scale: 3, nullable: false })
  factor_value: number;

  @OneToMany(()=> Pet, pet=> pet.activity)
  pets:Pet[]
}
