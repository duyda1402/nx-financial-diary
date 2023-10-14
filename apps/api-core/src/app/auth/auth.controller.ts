import { Body, Controller, Get, Post, Req, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiResponse } from "../../common/api.response";
import { AuthGuard } from "./guard/auth.guard";

@Controller("")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post("auth/refresh")
  async refreshToken(@Body() body: { refreshToken: string }): Promise<ApiResponse> {
    return ApiResponse.success(await this.authService.handlerResetToken(body.refreshToken));
  }
}
