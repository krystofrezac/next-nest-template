import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';

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
          res[k] = value[k] === null ? '' : value[k];
        });
        console.log(typeof value);
        return res;
      }),
    );
  }
}
