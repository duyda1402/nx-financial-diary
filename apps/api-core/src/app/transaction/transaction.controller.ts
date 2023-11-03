import { Controller, Get, Req, UseGuards, Request, Post, Body, Param } from "@nestjs/common";

import { AuthGuard } from "../auth/guard/auth.guard";
import { ApiResponse } from "../../common/api.response";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./transaction.dto";

@Controller("recent")
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
  async createWallet(@Req() req: Request, @Body() body: CreateTransactionDto): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.transactionService.create({ ...body, userId });
    return ApiResponse.success(result);
  }

  @Get("wallet/:walletId")
  @UseGuards(AuthGuard)
  async getTotalBalance(@Req() req: Request, @Param("walletId") walletId: string): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.transactionService.getListByWallet(walletId, userId);
    return ApiResponse.success(result);
  }
}
