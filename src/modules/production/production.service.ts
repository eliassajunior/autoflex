import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { Repository } from "typeorm";
import { Material } from "../material/entities/material.entity";
import { Product } from "../product/entities/product.entity";
import { Revenue } from "../product/types/revenue.type";
import { StorageService } from "../storage/storage.service";
import { ProduceProductDto } from "./dtos/produce-product.dto";
import { Production } from "./entities/production.entity";

@Injectable()
export class ProductionService {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    private readonly storageService: StorageService,
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

  async produceProduct(data: ProduceProductDto): Promise<ReplyMessage> {
    const recipeProduct = await this.productionRepository.find({
      where: {
        product: {
          code: data.code,
        },
      },
      relations: { material: true, product: true },
    });

    if (!recipeProduct.length) {
      throw new NotFoundException("Product recipe not found.");
    }

    for (const item of recipeProduct) {
      const totatRequired = item.quantityRequired * data.quantity;

      if (item.material.stock < totatRequired) {
        throw new ConflictException(`Insufficient material to produce ${data.quantity} ${item.product.name}.`);
      }
    }

    for (const item of recipeProduct) {
      const totatRequired = item.quantityRequired * data.quantity;

      item.material.stock -= totatRequired;
      await this.materialRepository.save(item.material);
    }

    await this.storageService.add(data.code, data.quantity);

    return { message: "Product successfully manufactured!" };
  }
}
