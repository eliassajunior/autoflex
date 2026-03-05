import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { Repository } from "typeorm";
import { Product } from "../product/entities/product.entity";
import { Storage } from "./entities/storage.entity";

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Storage[]> {
    return await this.storageRepository.find();
  }

  async add(code: string, quantity: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { code: code } });
    if (!product) {
      throw new NotFoundException("Product not found.");
    }

    const storage = await this.storageRepository.findOne({ where: { product: { code: code } } });
    if (storage) {
      storage.quantity += quantity;
      await this.storageRepository.save(storage);
    } else {
      const newProduct = this.storageRepository.create({
        product: product,
        quantity: quantity,
      });
      await this.storageRepository.save(newProduct);
    }
  }
}
