import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { EmailDto } from "./dto/mailing.dto";

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailDto: EmailDto) {
    const { templates, data, toMail, subject } = emailDto;
    this.logger.log("Send Mail with data: " + JSON.stringify(emailDto));
    try {
      //const result = await
      this.mailerService.sendMail({
        to: toMail, // list of receivers
        subject: subject, // Subject line
        template: `./${templates}`,
        context: data,
      });
      return {
        message: "success",
      };
    } catch (error) {
      this.logger.error("Send Error with message: " + error?.message);
      throw new BadRequestException(error?.message);
    }
  }
}
