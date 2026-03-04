import { Body, Controller, Post } from "@nestjs/common";
import { ProduceProductDto } from "./dtos/produce-product.dto";
import { ProductionService } from "./production.service";

@Controller("production")
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  async produceProduct(@Body() body: ProduceProductDto) {
    return await this.productionService.produceProduct(body);
  }
}
