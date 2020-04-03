import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from 'user/user.module';
import AuthModule from 'auth/auth.module';
import RoleModule from 'role/role.module';
import ResourceModule from 'resource/resource.module';
import ResourceCategoryModule from 'resourceCategory/resourceCategory.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RoleModule,
    ResourceModule,
    ResourceCategoryModule,

    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot(),
  ],
})
export default class AppModule {}
