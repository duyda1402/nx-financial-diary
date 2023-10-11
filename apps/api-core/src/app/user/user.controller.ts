import { BadRequestException, Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse } from '../../common/api.response';
import { MessageCode } from '../../common/enum/error.enum';




@Controller()
export class UserController {
     constructor(private readonly userService: UserService) { }

     @Post("user")
     async findUserByEmail(@Body() body: { email: string; }): Promise<ApiResponse> {
          const user = await this.userService.validateUserByEmail(body.email);
          if (!user) {
               throw new BadRequestException({ code: MessageCode.NOT_FOUND, message: "Not Found" });
          }
          return ApiResponse.success({
               address: user.email,
               createAt: user.createdAt,
               updateAt: user.updatedAt,
               id: user.userId,
               verified: user.isVerified
          });
     }

     @Post("users")
     async createUserByEmail(@Body() body: { email: string; }): Promise<ApiResponse> {
          const user = await this.userService.createUser(body.email);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { hash, ...result } = user
          return ApiResponse.success({ ...result, id: user.userId });
     }

     @Get("users/:userId")
     async getUser(@Param() params: { userId: string }): Promise<ApiResponse> {
          const user = await this.userService.findUserBy({ userId: params.userId })
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { hash, ...result } = user
          return ApiResponse.success({ ...result, id: user.userId });
     }
}
