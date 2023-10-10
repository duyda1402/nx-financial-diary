import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';


@Module({
     imports: [
          MailerModule.forRoot({
               transport: {
                    host: process.env.MAIL_HOST,
                    service: 'gmail',
                    port: 587,
                    secure: false,
                    auth: {
                         user: process.env.SMTP_USERNAME,
                         pass: process.env.SMTP_PASSWORD,
                    },
               },
               defaults: {
                    from: `"No Reply" <${process.env.SMTP_USERNAME}>`,
               },
               template: {
                    dir: join(__dirname, './templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                         strict: true,
                    },
               },
          }),
     ],
     providers: [MailingService],
     exports: [MailingService],
})
export class MailingModule { }
