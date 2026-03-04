import { Material } from "src/modules/material/entities/material.entity";
import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "production" })
export class Production {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(() => Product, (product) => product.productProduction, { onDelete: "CASCADE" })
  @JoinColumn({ name: "product" })
  product: Product;
  @ManyToOne(() => Material, (material) => material.materialProduction, { onDelete: "CASCADE" })
  @JoinColumn({ name: "material" })
  material: Material;

  @Column({ type: "int" })
  quantityRequired: number;
}
