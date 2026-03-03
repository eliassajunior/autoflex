import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { capitalize } from "src/utils/capitalize.util";
import { Repository, UpdateResult } from "typeorm";
import { CreateMaterialDto } from "./dtos/create-material.dto";
import { Material } from "./entities/material.entity";

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async findAll(): Promise<Material[]> {
    return await this.materialRepository.find();
  }

  async create(data: CreateMaterialDto): Promise<UpdateResult | ReplyMessage> {
    const code = `COD-${data.code}BR`.toUpperCase();

    const codeExists = await this.materialRepository.findOne({ where: { code: code } });
    if (codeExists) {
      return await this.materialRepository.update({ code: codeExists.code }, { quantity: codeExists.quantity + 1 });
    }

    const newMaterial = this.materialRepository.create({
      code: code,
      name: capitalize(data.name),
      quantity: 1,
    });
    await this.materialRepository.save(newMaterial);

    return { message: "Material successfully created!" };
  }

  async update(code: string, name: string): Promise<ReplyMessage> {
    const codeExists = await this.materialRepository.findOne({ where: { code: code } });
    if (!codeExists) {
      throw new NotFoundException("Material not found.");
    }

    const newName = name ? name : codeExists.name;
    await this.materialRepository.update({ code: codeExists.code }, { name: capitalize(newName) });

    return { message: "Material successfully updated!" };
  }

  async remove(code: string): Promise<UpdateResult | ReplyMessage> {
    const codeExists = await this.materialRepository.findOne({ where: { code: code } });
    if (!codeExists) {
      throw new NotFoundException("Material not found.");
    }

    if (codeExists.quantity > 1) {
      return await this.materialRepository.update({ code: codeExists.code }, { quantity: codeExists.quantity - 1 });
    }
    await this.materialRepository.remove(codeExists);

    return { message: "Material successfully removed!" };
  }
}
