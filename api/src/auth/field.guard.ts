import { Transform } from 'class-transformer';

const FieldGuard = (...resources: string[]) => {
  const transform = Transform(value => ({ __RESOURCE_GUARD__: true, resources, value }));
  return (target: any, key?: string) => {
    transform(target, key);
  };
};

export default FieldGuard;
