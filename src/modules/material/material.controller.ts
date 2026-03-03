import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { UpdateResult } from "typeorm";
import { CreateMaterialDto } from "./dtos/create-material.dto";
import { Material } from "./entities/material.entity";
import { MaterialService } from "./material.service";

@Controller("material")
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  async findAll(): Promise<Material[]> {
    return await this.materialService.findAll();
  }

  @Post()
  async create(@Body() body: CreateMaterialDto): Promise<UpdateResult | ReplyMessage> {
    return await this.materialService.create(body);
  }

  @Patch(":code")
  async update(@Param("code") code: string, @Body("name") name: string): Promise<ReplyMessage> {
    return await this.materialService.update(code, name);
  }

  @Delete(":code")
  async remove(@Param("code") code: string): Promise<UpdateResult | ReplyMessage> {
    return await this.materialService.remove(code);
  }
}
