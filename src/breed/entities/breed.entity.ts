import { Column, PrimaryGeneratedColumn } from "typeorm";


export class Breed {

  @PrimaryGeneratedColumn("uuid")
  breed_id: string;

  @Column({name: "description", length: 50, nullable: false})
  description: string;


  @Column({name: "is_active", default: 1})
  is_active: number;

}
