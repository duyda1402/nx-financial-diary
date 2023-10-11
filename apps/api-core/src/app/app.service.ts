import { Injectable } from '@nestjs/common';
import { ApiResponse } from '../common/api.response';

@Injectable()
export class AppService {

  getData(): ApiResponse {
    return ApiResponse.success("Service connect successfully");
  }
}
