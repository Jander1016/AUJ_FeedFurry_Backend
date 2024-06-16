import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "users"})
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column({ name: "email", unique: true, length: 50, nullable: false })
  email: string;

  @Column({ name: "password"})
  password: string;

  @Column({ name: "name", length: 50, nullable: false })
  name: string;

  @Column({ name: "lastname", length: 50 })
  lastname: string;

  @Column({ name: "phone", length: 15 })
  phone: string;

  @Column({ name:"role", length:"20", default: "user"})
  role: string;

  @Column({ name: "is_active", default: 1 })
  is_active: number;
}
