import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductionModule } from "../production/production.module";
import { Product } from "./entities/product.entity";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProductionModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
