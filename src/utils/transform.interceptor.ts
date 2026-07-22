import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';


const messages: Record<number, string>={
  200: "Sucess",
  201: "Created successfully",
  202: "Request Accepted",
  204: "Deleted successfully",

  
}

@Injectable()
export class TransformInterceptor <T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response:Response = context.switchToHttp().getResponse();
    const status = response.statusCode;
    
    const message = messages[status] ?? "Success";

    return next.handle().pipe(map((data: T)=>({
      status,
      message:"Success",
      data
    })));
  }
}


// T - typescript generic type