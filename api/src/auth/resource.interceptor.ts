import {
  Injectable,
  ExecutionContext,
  CallHandler,
  ClassSerializerInterceptor,
  Inject,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Observable } from 'rxjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import { map } from 'rxjs/operators';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';
import { PlainLiteralObject } from '@nestjs/common/serializer/class-serializer.interceptor';
import { CLASS_SERIALIZER_OPTIONS } from '@nestjs/common/serializer/class-serializer.constants';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import AuthService from './auth.service';

const REFLECTOR = 'Reflector';

let classTransformer: any = {};

@Injectable()
class ResourceInterceptor extends ClassSerializerInterceptor {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(REFLECTOR) protected readonly reflector: any,
  ) {
    super(reflector);
    classTransformer = loadPackage('class-transformer', 'ClassSerializerInterceptor', () =>
      require('class-transformer'),
    );
    require('class-transformer');
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
    return isArray
      ? (response as PlainLiteralObject[]).map(item => this.transformToClass(item, options))
      : this.transformToGuard(this.transformToClass(response, options), user);
  }

  transformToClass(plainOrClass: any, options: ClassTransformOptions): PlainLiteralObject {
    return plainOrClass && plainOrClass.constructor !== Object
      ? classTransformer.classToClass(plainOrClass, options)
      : plainOrClass;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = this.getContextOptionsCustom(context);
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    return next.handle().pipe(
      map((res: PlainLiteralObject | Array<PlainLiteralObject>) => {
        return this.serializeCustom(res, options, user);
      }),
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
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(response)) {
      const item = response[key];
      // eslint-disable-next-line no-underscore-dangle
      if (typeof item === 'object' && item !== null && item.__RESOURCE_GUARD__ === true) {
        // eslint-disable-next-line no-await-in-loop
        response[key] = (await this.authService.hasAccess(userId, item.resources))
          ? response[key].value
          : null;
      }
    }
    return response;
  }
}

export default ResourceInterceptor;
