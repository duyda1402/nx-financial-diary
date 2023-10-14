import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { generateUUID } from "../../utils";
import { UserEntity } from "./entity/user.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(email: string): Promise<UserEntity> {
    const user = await this.findUserByEmail(email);
    if (user?.isVerified) {
      throw new BadRequestException("User already exists");
    }
    if (user) {
      return user;
    }
    const userId = generateUUID();
    const userNew = this.userRepository.create({
      userId: userId,
      email: email,
    });
    return this.userRepository.save(userNew);
  }

  async validateUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: email, isVerified: true },
    });
    return user;
  }

  async updateUserById(userId: string, data: QueryDeepPartialEntity<UserEntity>): Promise<UpdateResult> {
    return this.userRepository.update({ userId }, data);
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async findUserBy(condition: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[]): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy(condition);
    return user;
  }
}
