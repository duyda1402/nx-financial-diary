import { CallHandler, ExecutionContext, Injectable, HttpStatus, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";

@Injectable()
export class StatusSuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    // const req = ctx.getRequest();
    const res = ctx.getResponse();
    const statusSuccess = [HttpStatus.ACCEPTED, HttpStatus.OK, HttpStatus.CREATED, HttpStatus.NO_CONTENT];
    return next.handle().pipe(
      map((value) => {
        if (statusSuccess.includes(res.statusCode)) {
          res.status(HttpStatus.OK);
        }
        return value;
      }),
    );
  }
}
