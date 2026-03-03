import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "materials" })
export class Material {
  @PrimaryColumn({ unique: true, length: 11 })
  code: string;

  @Column({ type: "varchar", unique: true })
  name: string;
  @Column({ type: "int", default: 0 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
