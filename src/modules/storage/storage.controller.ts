import { Controller, Get } from "@nestjs/common";
import { Storage } from "./entities/storage.entity";
import { StorageService } from "./storage.service";

@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  async findAll(): Promise<Storage[]> {
    return await this.storageService.findAll();
  }
}
