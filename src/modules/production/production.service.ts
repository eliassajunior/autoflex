import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Material } from "../material/entities/material.entity";
import { Product } from "../product/entities/product.entity";
import { Revenue } from "../product/types/revenue.type";
import { Production } from "./entities/production.entity";

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async createRevenue(product: Product, materials: Revenue[]): Promise<void> {
    for (const item of materials) {
      const material = await this.materialRepository.findOne({ where: { code: item.code } });
      if (!material) {
        throw new NotFoundException("Material not found.");
      }

      const materialExistsInProduct = await this.productionRepository.findOne({
        where: {
          product: { code: product.code },
          material: { code: material.code },
        },
      });
      if (materialExistsInProduct) {
        throw new ConflictException("Material already registered.");
      }

      const newRevenue = this.productionRepository.create({
        product: product,
        material: material,
        quantityRequired: item.quantity,
      });
      await this.productionRepository.save(newRevenue);
    }
  }

  async updateRevenue(product: Product, materials: Revenue[]): Promise<void> {
    for (const item of materials) {
      const material = await this.materialRepository.findOne({ where: { code: item.code } });
      if (!material) {
        throw new NotFoundException("Material not found.");
      }

      const materialExistsInProduct = await this.productionRepository.findOne({
        where: {
          product: { code: product.code },
          material: { code: material.code },
        },
      });

      if (materialExistsInProduct) {
        materialExistsInProduct.quantityRequired = item.quantity;
        await this.productionRepository.save(materialExistsInProduct);
      } else {
        const newRevenue = this.productionRepository.create({
          product: product,
          material: material,
          quantityRequired: item.quantity,
        });
        await this.productionRepository.save(newRevenue);
      }
    }
  }
}
