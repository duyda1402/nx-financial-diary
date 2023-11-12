import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiResponse } from "../../common/api.response";
import { AuthGuard } from "../auth/guard/auth.guard";
import { CategoryService } from "./category.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get("")
  @UseGuards(AuthGuard)
  async getAllCategories(@Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.categoryService.getList(userId);
    return ApiResponse.success(result);
  }

  @Post("system")
  async createSystem(@Body() body: CreateCategoryDto): Promise<ApiResponse> {
    const result = await this.categoryService.createSystem(body);
    return ApiResponse.success(result);
  }

  @Post("")
  @UseGuards(AuthGuard)
  async createByUser(@Req() req: Request, @Body() body: CreateCategoryDto): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.categoryService.createByUser(userId, body);
    return ApiResponse.success(result);
  }

  @Patch(":categoryId")
  @UseGuards(AuthGuard)
  async updateCategory(
    @Param("categoryId") categoryId: string,
    @Req() req: Request,
    @Body() body: UpdateCategoryDto,
  ): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.categoryService.updateCategory(categoryId, userId, body);
    if (result.affected !== 0) {
      return ApiResponse.success();
    } else {
      throw new BadRequestException("something went wrong!");
    }
  }

  @Delete(":categoryId")
  @UseGuards(AuthGuard)
  async deleteCategory(@Param("categoryId") categoryId: string, @Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.categoryService.deleteCategory(categoryId, userId);
    if (result.affected !== 0) {
      return ApiResponse.success();
    } else {
      throw new BadRequestException("something went wrong!");
    }
  }
}
