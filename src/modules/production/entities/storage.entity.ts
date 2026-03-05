import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage" })
export class Storage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "int" })
  quantityProduced: number;
}
