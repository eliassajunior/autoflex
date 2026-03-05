import { Body, Controller, Get, Post } from "@nestjs/common";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { ProduceProductDto } from "./dtos/produce-product.dto";
import { ProductionService } from "./production.service";
import { ProductionAvailability } from "./types/production-availability.type";

@Controller("production")
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Get()
  async getProductionAvailability(): Promise<ProductionAvailability[]> {
    return await this.productionService.getProductionAvailability();
  }

  @Post()
  async produceProduct(@Body() body: ProduceProductDto): Promise<ReplyMessage> {
    return await this.productionService.produceProduct(body);
  }
}
