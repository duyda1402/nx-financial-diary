import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CategoryType } from "../../common/enum/category.enum";
import { generateUUID } from "../../utils";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";
import { CategoryEntity } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getList(userId: string): Promise<CategoryEntity[]> {
    const wallets = await this.categoryRepository.find({
      where: [
        { type: CategoryType.SYSTEM },
        {
          userId: userId,
          type: CategoryType.CUSTOM,
        },
      ],
    });
    return wallets;
  }

  async createSystem(data: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryId = generateUUID();
    const category = this.categoryRepository.create({ ...data, categoryId, type: CategoryType.SYSTEM });
    return this.categoryRepository.save(category);
  }

  async createByUser(userId: string, data: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryId = generateUUID();
    const category = this.categoryRepository.create({ ...data, categoryId, userId, type: CategoryType.CUSTOM });
    return this.categoryRepository.save(category);
  }

  async updateCategory(categoryId: string, userId: string, data: UpdateCategoryDto): Promise<UpdateResult> {
    return this.categoryRepository.update(
      {
        categoryId,
        userId,
        type: CategoryType.CUSTOM,
      },
      data,
    );
  }

  async deleteCategory(categoryId: string, userId: string): Promise<DeleteResult> {
    return this.categoryRepository.delete({
      categoryId,
      userId,
      type: CategoryType.CUSTOM,
    });
  }
}
