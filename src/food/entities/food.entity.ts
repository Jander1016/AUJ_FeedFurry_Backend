// import { DetailDiet } from "src/detail-diet/entities/detail-diet.entity";
import { DetailDiet } from "src/detail-diet/entities/detail-diet.entity";
import { Column, Entity, OneToMany,  PrimaryGeneratedColumn } from "typeorm";

@Entity("food")
export class Food {
  @PrimaryGeneratedColumn('uuid')
  food_id: string;

  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @Column({ name: 'calories', type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  calories: number;

  @Column({ name: 'protein', type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  protein: number;

  @Column({ name: 'fat', type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  fat: number;

  @Column({ name: 'carbohydrates', type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  carbohydrates: number;

  @Column({ name: 'fiber', type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  fiber: number;

  @Column({ name: 'sodium', type: 'decimal', precision: 10, scale: 2, nullable: false, default: 0 })
  sodium: number;

  @Column({ name: 'is_active', default: 1 })
  is_active: number;

  // @OneToMany(() => DetailDiet, detailDiet => detailDiet.food)
  // detailDiets: DetailDiet[]
}
