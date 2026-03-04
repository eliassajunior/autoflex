import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { Revenue } from "../types/revenue.type";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  code: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  materials: Revenue[];
}
