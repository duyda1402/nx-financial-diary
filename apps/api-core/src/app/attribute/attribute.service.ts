import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository, UpdateResult } from "typeorm";
import { AttributeEntity } from "./attribute.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(AttributeEntity)
    private attributeRepository: Repository<AttributeEntity>,
  ) {}

  async create(data: DeepPartial<AttributeEntity>): Promise<AttributeEntity> {
    const wallet = this.attributeRepository.create({ ...data });
    return this.attributeRepository.save(wallet);
  }

  async update(userId: string, data: QueryDeepPartialEntity<AttributeEntity>): Promise<UpdateResult> {
    return this.attributeRepository.update({ userId: userId }, data);
  }

  async getAttributeByUserId(userId: string): Promise<AttributeEntity> {
    return await this.attributeRepository.findOne({ where: { userId: userId } });
  }
}
