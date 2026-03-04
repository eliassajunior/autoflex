import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProduceProductDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
