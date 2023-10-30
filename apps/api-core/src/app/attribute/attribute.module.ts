import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttributeEntity } from "./attribute.entity";
import { AttributeService } from "./attribute.service";

@Module({
  imports: [TypeOrmModule.forFeature([AttributeEntity])],
  providers: [AttributeService],
  exports: [AttributeService],
})
export class AttributeModule {}
