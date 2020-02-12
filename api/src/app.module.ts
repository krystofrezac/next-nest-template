import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from 'user/user.module';
import AuthModule from 'auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,

    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot(),
  ],
})
export default class AppModule {}
