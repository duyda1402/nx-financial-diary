import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiResponse } from "../../common/api.response";
import { AuthGuard } from "../auth/guard/auth.guard";
import { CreateWalletDto, UpdateWalletDto } from "./wallet.dto";
import { WalletService } from "./wallet.service";

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

  @Get(":walletId")
  @UseGuards(AuthGuard)
  async getWallet(@Param("walletId") walletId: string, @Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.walletService.getDetails(walletId, userId);
    return ApiResponse.success(result);
  }

  @Delete(":walletId")
  @UseGuards(AuthGuard)
  async deleteWallet(@Param("walletId") walletId: string, @Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.walletService.deleteWallet(walletId, userId);
    if (result.affected !== 0) {
      return ApiResponse.success();
    } else {
      throw new BadRequestException("something went wrong!");
    }
  }

  @Patch(":walletId")
  @UseGuards(AuthGuard)
  async updateWallet(
    @Param("walletId") walletId: string,
    @Req() req: Request,
    @Body() body: UpdateWalletDto,
  ): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.walletService.updateWallet(walletId, userId, body);
    if (result.affected !== 0) {
      return ApiResponse.success();
    } else {
      throw new BadRequestException("something went wrong!");
    }
  }
}
