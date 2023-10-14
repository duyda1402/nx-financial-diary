import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class EmailDto {
  @IsEmail()
  toMail: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  data: Record<string, unknown>;

  @IsNotEmpty()
  @IsOptional()
  templates?: string;
}
