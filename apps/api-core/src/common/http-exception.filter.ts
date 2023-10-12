import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from './api.response';
import { MessageCode } from './enum/message-code.enum';

interface Err {
     message: string;
     error: unknown;
     details: unknown;
     code: MessageCode & HttpStatus
     statusCode: unknown;
     response: unknown;
     data: Record<string, string>;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
     logger: Logger = new Logger(HttpExceptionFilter.name);
     catch(exception: HttpException, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const response = ctx.getResponse<Response>();
          const request = ctx.getRequest<Request>();
          const status = exception.getStatus();
          const err: Err = exception.getResponse() as Err;
          const code = err.code || status
          const message = err.message || err.error || err.details || exception.message
          this.logger.error(`Path: ${request.url} | Body: ${JSON.stringify(request.body)}`);
          response
               .status(status)
               .json(ApiResponse.customError(code, message.toString()));
     }
}