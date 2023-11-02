import { TemplateEmail } from "apps/api-core/src/common/enum/template-email.enum";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class EmailDto {
  @IsEmail()
  toMail: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  data: Record<string, unknown>;

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(TemplateEmail)
  templates: TemplateEmail;
}
