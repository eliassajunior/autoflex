import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReplyMessage } from "src/global/types/reply-message.type";
import { capitalize } from "src/utils/capitalize.util";
import { Repository } from "typeorm";
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

  async create(data: CreateMaterialDto): Promise<ReplyMessage> {
    const code = `COD-${data.code}BR`.toUpperCase();

    const material = await this.materialRepository.findOne({ where: { code: code } });
    if (material) {
      if (material.name === data.name) {
        await this.materialRepository.update({ code: material.code }, { stock: material.stock + 1 });
        return { message: "Material added." };
      }
      throw new ConflictException("The code is already registered with another item.");
    }

    const newMaterial = this.materialRepository.create({
      code: code,
      name: capitalize(data.name),
      stock: 1,
    });
    await this.materialRepository.save(newMaterial);

    return { message: "Material successfully created!" };
  }

  async update(code: string, name: string): Promise<ReplyMessage> {
    const material = await this.materialRepository.findOne({ where: { code: code } });
    if (!material) {
      throw new NotFoundException("Material not found.");
    }

    const newName = name ? name : material.name;
    await this.materialRepository.update({ code: material.code }, { name: capitalize(newName) });

    return { message: "Material successfully updated!" };
  }

  async remove(code: string): Promise<ReplyMessage> {
    const material = await this.materialRepository.findOne({ where: { code: code } });
    if (!material) {
      throw new NotFoundException("Material not found.");
    }

    if (material.stock > 1) {
      await this.materialRepository.update({ code: material.code }, { stock: material.stock - 1 });
      return { message: "Material removed." };
    }
    await this.materialRepository.remove(material);

    return { message: "Material successfully removed!" };
  }
}
