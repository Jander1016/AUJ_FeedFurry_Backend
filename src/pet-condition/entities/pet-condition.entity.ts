import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "pet_condition"})
export class PetCondition {
  @PrimaryGeneratedColumn('uuid')
  condition_id: string;

  @Column({ name: 'description', length: 50, nullable: false })
  description: string;

  @Column({ name: 'factor_value', type: 'decimal', precision: 10, scale: 2, nullable: false })
  factor_value: number;
}
