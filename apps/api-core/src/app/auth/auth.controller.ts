import { Body, Controller, Get, Post, Req, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../common/api.response";
import { AuthGuard } from "./guard/auth.guard";
import { AttributeService } from "../attribute/attribute.service";

@Controller("")
export class AuthController {
  constructor(private readonly authService: AuthService, private attributeService: AttributeService) {}

  @Post("passcode/login/initialize")
  async loginInitialize(@Body() body: { email: string; userId: string }): Promise<ApiResponse> {
    return ApiResponse.success(await this.authService.initialize(body.email, body.userId));
  }

  @Post("passcode/login/finalize")
  async loginFinalize(@Body() body: { id: string; code: string }): Promise<ApiResponse> {
    return ApiResponse.success(await this.authService.finalize(body.id, body.code));
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request): Promise<ApiResponse> {
    return ApiResponse.success({ id: req["user"]?.sub });
  }

  @Get("config")
  @UseGuards(AuthGuard)
  async getConfig(@Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const config = await this.attributeService.getAttributeByUserId(userId);
    return ApiResponse.success(config);
  }

  @Post("config")
  @UseGuards(AuthGuard)
  async createConfig(@Req() req: Request): Promise<ApiResponse> {
    const userId = req["user"]?.sub;
    const config = await this.attributeService.create({ userId });
    return ApiResponse.success(config);
  }

  @Post("auth/refresh")
  async refreshToken(@Body() body: { refreshToken: string }): Promise<ApiResponse> {
    return ApiResponse.success(await this.authService.handlerResetToken(body.refreshToken));
  }
}
