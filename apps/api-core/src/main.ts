import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as ngrok from "ngrok";
import { AppModule } from "./app/app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  const globalPrefix = process.env.GLOBAL_PREFIX || "api";
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  // const urlNgrok = await ngrok.connect(+port);
  app.useGlobalPipes(new ValidationPipe());
  // Allow access to static file
  app.useStaticAssets(join(__dirname, "..", "assets"), { prefix: `/${globalPrefix}/public` });
  await app.listen(port);
  const ip = process.env.SERVICE_IP || "localhost";
  Logger.log(`🚀 Application is running Local on: http://${ip}:${port}/${globalPrefix}`);
  // Logger.log(`🚀 Application is running Ngrok on: ${urlNgrok}/${globalPrefix}`);
}

bootstrap();
