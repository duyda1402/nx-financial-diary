import {
  Controller,
  Get,
  Req,
  UseGuards,
  Request,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  BadRequestException,
} from "@nestjs/common";

import { AuthGuard } from "../auth/guard/auth.guard";
import { ApiResponse } from "../../common/api.response";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto, UpdateTransactionDto } from "./transaction.dto";

@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get("")
  @UseGuards(AuthGuard)
  async getTransactionByUser(@Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.transactionService.getListByUser(userId);
    return ApiResponse.success(result);
  }

  @Post("")
  @UseGuards(AuthGuard)
  async createTransaction(@Req() req: Request, @Body() body: CreateTransactionDto): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.transactionService.create(userId, body);
    return ApiResponse.success(result);
  }

  @Patch(":transactionId")
  @UseGuards(AuthGuard)
  async updateTransaction(
    @Req() req: Request,
    @Param("transactionId") transactionId: string,
    @Body() body: UpdateTransactionDto,
  ): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.transactionService.update(transactionId, userId, body);
    if (result.affected !== 0) {
      return ApiResponse.success();
    } else {
      throw new BadRequestException("something went wrong!");
    }
  }

  @Delete(":transactionId")
  @UseGuards(AuthGuard)
  async deleteTransaction(@Req() req: Request, @Param("transactionId") transactionId: string): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.transactionService.delete(transactionId, userId);
    if (result.affected !== 0) {
      return ApiResponse.success();
    } else {
      throw new BadRequestException("something went wrong!");
    }
  }

  @Get("wallet/:walletId")
  @UseGuards(AuthGuard)
  async getTransactionByWallet(@Req() req: Request, @Param("walletId") walletId: string): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.transactionService.getListByWallet(walletId, userId);
    return ApiResponse.success(result);
  }
}
