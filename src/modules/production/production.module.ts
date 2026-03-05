import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Material } from "../material/entities/material.entity";
import { StorageModule } from "../storage/storage.module";
import { Production } from "./entities/production.entity";
import { ProductionController } from "./production.controller";
import { ProductionService } from "./production.service";
import { Product } from "../product/entities/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Production, Material, Product]), StorageModule],
  controllers: [ProductionController],
  providers: [ProductionService],
  exports: [ProductionService],
})
export class ProductionModule {}
