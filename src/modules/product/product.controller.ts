import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { Product } from "./entities/product.entity";
import { ProductService } from "./product.service";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Post()
  async create(@Body() body: CreateProductDto): Promise<ReplyMessage> {
    return await this.productService.create(body);
  }

  @Patch(":code")
  async update(@Param("code") code: string, @Body() body: UpdateProductDto): Promise<ReplyMessage> {
    return await this.productService.update(code, body);
  }

  @Delete(":code")
  async remove(@Param("code") code: string): Promise<ReplyMessage> {
    return await this.productService.remove(code);
  }
}
