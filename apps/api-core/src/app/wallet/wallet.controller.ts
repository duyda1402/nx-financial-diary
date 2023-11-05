import {
  Controller,
  Get,
  Req,
  UseGuards,
  Request,
  Post,
  Body,
  Put,
  Param,
  BadRequestException,
  BadGatewayException,
} from "@nestjs/common";
import { WalletService } from "./wallet.service";
import { AuthGuard } from "../auth/guard/auth.guard";
import { ApiResponse } from "../../common/api.response";
import { CreateWalletDto, UpdateWalletDto } from "./wallet.dto";

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

  @Put(":walletId")
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

  @Get("balance")
  @UseGuards(AuthGuard)
  async getTotalBalance(@Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const result = await this.walletService.getTotalBalance(userId);
    return ApiResponse.success(result);
  }
}
