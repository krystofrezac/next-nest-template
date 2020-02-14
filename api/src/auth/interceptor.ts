import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { PlainLiteralObject } from '@nestjs/common/serializer/class-serializer.interceptor';

@Injectable()
class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
export default LoggingInterceptor;

export interface Response<T> {
  data: T;
}

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req.user);
    return next.handle().pipe(
      map(value => {
        const res = {};
        Object.keys(value).forEach(k => {
          if (typeof value[k] === 'object' && value[k].resourceGuard === true) {
            console.log('*', value[k].value);
            res[k] = value[k].value;
          } else {
            res[k] = value[k] === null ? '' : value[k];
          }
        });
        console.log(typeof value);
        return res;
      }),
    );
  }
}
