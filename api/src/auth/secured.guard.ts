import { UseGuards, UseInterceptors } from '@nestjs/common';
import ResourcesGuard from 'auth/resource.guard';
import GqlAuthGuard from 'auth/jwt.guard';
import ResourceDecorator from './resource.decorator';
import ResourceInterceptor from './resource.interceptor';

const Secured = (resources: string[] = []) => {
  const metadata = ResourceDecorator(...resources);
  const resourceGuard = UseGuards(ResourcesGuard);
  const gqlGuard = UseGuards(GqlAuthGuard);
  const resourceInterceptor = UseInterceptors(ResourceInterceptor);

  return (target: any, key?: string, descriptor?: any) => {
    metadata(target, key, descriptor);
    gqlGuard(target, key, descriptor);
    resourceGuard(target, key, descriptor);
    resourceInterceptor(target, key, descriptor);
  };
};

export default Secured;
