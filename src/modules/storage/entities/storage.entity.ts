import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "storage" })
export class Storage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: "product" })
  product: Product;

  @Column({ type: "int", default: 0 })
  quantity: number;
}
