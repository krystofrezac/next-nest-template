import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserModule from './user/user.module';

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'template',
      entities: [],
      synchronize: true,
    }),
  ],
})
export default class AppModule {}
