import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateWalletDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  balance?: number;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateWalletDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  balance?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
