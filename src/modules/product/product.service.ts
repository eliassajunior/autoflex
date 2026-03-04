import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { capitalize } from "src/utils/capitalize.util";
import { Repository } from "typeorm";
import { ProductionService } from "../production/production.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly productionService: ProductionService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: {
        productProduction: {
          material: true,
        },
      },
    });
  }

  async create(data: CreateProductDto): Promise<ReplyMessage> {
    const code = `COD-${data.code}BR`.toUpperCase();

    const newProduct = this.productRepository.create({
      code: code,
      name: capitalize(data.name),
      price: data.price,
    });

    await this.productRepository.save(newProduct);
    await this.productionService.createRevenue(newProduct, data.materials);

    return { message: "Product successfully created!" };
  }

  async update(code: string, data: UpdateProductDto): Promise<ReplyMessage> {
    const product = await this.productRepository.findOne({ where: { code: code } });
    if (!product) {
      throw new NotFoundException("Product not found.");
    }

    const newName = data.name ? data.name : product.name;
    const newPrice = data.price ? data.price : product.price;

    await this.productRepository.update({ code: code }, { name: newName, price: newPrice });

    if (data.materials) {
      await this.productionService.updateRevenue(product, data.materials);
    }

    return { message: "Product successfully updated!" };
  }

  async remove(code: string): Promise<ReplyMessage> {
    const product = await this.productRepository.findOne({ where: { code: code } });
    if (!product) {
      throw new NotFoundException("Product not found.");
    }
    await this.productRepository.remove(product);

    return { message: "Product successfully created!" };
  }
}
