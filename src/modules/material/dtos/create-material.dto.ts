import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  code: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
