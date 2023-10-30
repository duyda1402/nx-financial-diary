import { Controller, Get, Req, UseGuards, Request, Post, Body } from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { AuthGuard } from "../auth/guard/auth.guard";
import { ApiResponse } from "../../common/api.response";
import { CreateWalletDto } from "./wallet.dto";

@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get("")
  @UseGuards(AuthGuard)
  async getWallets(@Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.walletService.getList(userId);
    return ApiResponse.success(result);
  }

  @Post("")
  @UseGuards(AuthGuard)
  async createWallet(@Req() req: Request, @Body() body: CreateWalletDto): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.walletService.create({ ...body, userId });
    return ApiResponse.success(result);
  }

  @Get("balance")
  @UseGuards(AuthGuard)
  async getTotalBalance(@Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.walletService.getTotalBalance(userId);
    return ApiResponse.success(result);
  }
}
