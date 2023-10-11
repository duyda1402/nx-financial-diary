import { Body, Controller, Get, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiResponse } from '../../common/api.response';


@Controller("")
export class AuthController {
     constructor(private readonly authService: AuthService) { }

     @Post('passcode/login/initialize')
     async loginInitialize(@Body() body: { email: string, userId: string }): Promise<ApiResponse> {
          return ApiResponse.success(await this.authService.initialize(body.email, body.userId))
     }

     @Post('passcode/login/finalize')
     async loginFinalize(@Body() body: { id: string, code: string }) {
          return ApiResponse.success(await this.authService.finalize(body.id, body.code))
     }

     @Get('me')
     async getMe() {
          return ApiResponse.success({ id: "14f2505c-8e3c-49a8-9724-ad301095c1f1" })
     }
}
