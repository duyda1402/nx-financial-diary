import { randomBytes } from "crypto";

export class ApiResponse<T = unknown> {
     code: number | string;
     message: string;
     data: T;
     traceId: string;

     constructor(code: number, message: string, data: T) {
          this.code = code || 200;
          this.message = message || 'success';
          this.data = data || null;
          this.traceId = randomBytes(4).toString('hex');
     }

     static success(data?: unknown): ApiResponse {
          return new ApiResponse(200, 'success', data);
     }

     static error(message?: string | 'error'): ApiResponse {
          return new ApiResponse(500, message, null);
     }

     static customError(code: number | 500, message?: string | 'Service Error'): ApiResponse {
          return new ApiResponse(code, message, null);
     }
}
