import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  parentId: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  parentId: string;

  @IsOptional()
  @IsString()
  description?: string;
}
