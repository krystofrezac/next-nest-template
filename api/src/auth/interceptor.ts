import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ClassSerializerInterceptor,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { PlainLiteralObject } from '@nestjs/common/serializer/class-serializer.interceptor';
import UserService from 'user/user.service';
import { CLASS_SERIALIZER_OPTIONS } from '@nestjs/common/serializer/class-serializer.constants';

const REFLECTOR = 'Reflector';
@Injectable()
export class ExcludeNullInterceptor extends ClassSerializerInterceptor {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(REFLECTOR) protected readonly reflector: any,
  ) {
    super(reflector);
  }

  serializeCustom(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    options: ClassTransformOptions,
    user: number,
  ): PlainLiteralObject | PlainLiteralObject[] {
    const isArray = Array.isArray(response);
    if (!(typeof response === 'object') && response !== null && !isArray) {
      return response;
    }
    const r = isArray
      ? (response as PlainLiteralObject[]).map(item => this.transformToPlain(item, options))
      : this.transformToGuard(this.transformToPlain(response, options), user);
    return r;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.getContextOptionsCustom(context);
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    return next
      .handle()
      .pipe(
        map((res: PlainLiteralObject | Array<PlainLiteralObject>) =>
          this.serializeCustom(res, options, user),
        ),
      );
  }

  private getContextOptionsCustom(context: ExecutionContext): ClassTransformOptions | undefined {
    return (
      this.reflectSerializeMetadataCustom(context.getHandler()) ||
      this.reflectSerializeMetadataCustom(context.getClass())
    );
  }

  private reflectSerializeMetadataCustom(
    obj: object | Function,
  ): ClassTransformOptions | undefined {
    return this.reflector.get(CLASS_SERIALIZER_OPTIONS, obj);
  }

  async transformToGuard(response, userId: number) {
    const user = await this.userService.findById(userId);
    console.log(user);

    const res = {};
    Object.keys(response).forEach(key => {
      if (
        typeof response[key] === 'object' &&
        response[key] !== null &&
        response[key].resourceGuard === true
      ) {
        // TODO has resource
        res[key] = response[key].value;
      } else {
        res[key] = response[key];
      }
    });
    return res;
  }
}
