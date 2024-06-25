import { PetCondition } from "src/pet-condition/entities/pet-condition.entity"
import { PetType } from "../../pet-type/entities/pet-type.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Activity } from "src/activities/entities/activity.entity"
import { User } from "src/users/entities/user.entity"
import { Diet } from "src/diet/entities/diet.entity"

@Entity("pet")
export class Pet {

  @PrimaryGeneratedColumn('uuid')
  pet_id: string

  @Column({ name: 'name', length: 50, nullable: false })
  name: string

  @Column({ name: 'pet_type_id', length: 40, nullable: false })
  pet_type_id: string

  @ManyToOne(() => PetType, (petType) => petType.breeds)
  @JoinColumn({ name: 'pet_type_id' })
  petType: PetType;

  @Column({ name: 'genre', length: 10, nullable: false })
  genre: string

  @Column({ name: 'weight', type: 'decimal', precision: 10, scale: 2, nullable: false })
  weight: number

  @Column({ name: 'age',  nullable: false })
  age: number

  @Column({ name: 'condition_id', length: 40, nullable: false })
  condition_id: string

  @Column({ name: 'activity_id', length: 40, nullable: false })
  activity_id: string

  @Column({ name: 'ratio', type: 'decimal', precision: 10, scale: 2, nullable: false })
  ratio: number
  
  @Column({ name: 'user_id', length: 40, nullable: false})
  user_id: string

  @ManyToOne(()=> User, (user) => user.pets)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ name: 'is_active', default: 1 })
  is_active: number

  @ManyToOne(() => PetCondition, condition => condition.pets)
  @JoinColumn({ name: 'condition_id' })
  condition: PetCondition

  @ManyToOne(() => Activity, activity => activity.pets)
  @JoinColumn({ name: 'activity_id' })
  activity: Activity

  @OneToMany(() => Diet, diet=> diet.pet)
  diets: Diet[];
}
