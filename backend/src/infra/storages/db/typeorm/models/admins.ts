import "reflect-metadata";

import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { TypeORMUser } from "./users";

@Entity("admins")
@Index(["userId"])
@Unique(["userId"])
export class TypeORMAdmin extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => TypeORMUser)
  @JoinColumn({ 
    foreignKeyConstraintName: "fk_user_admin",
    referencedColumnName: "id",
    name: "userId"
  })
  user: TypeORMUser;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
