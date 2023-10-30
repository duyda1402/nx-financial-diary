/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as ngrok from "ngrok";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = process.env.GLOBAL_PREFIX || "api";
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3000;
  // const urlNgrok = await ngrok.connect(+port);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  Logger.log(`🚀 Application is running Local on: http://localhost:${port}/${globalPrefix}`);
  // Logger.log(`🚀 Application is running Ngrok on: ${urlNgrok}/${globalPrefix}`);
}

bootstrap();
