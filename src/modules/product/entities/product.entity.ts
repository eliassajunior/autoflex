import { Production } from "src/modules/production/entities/production.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "products" })
export class Product {
  @PrimaryColumn()
  code: string;

  @Column({ type: "varchar", unique: true })
  name: string;
  @Column({ type: "int" })
  price: number;

  @OneToMany(() => Production, (production) => production.product)
  productProduction: Production[];

  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
