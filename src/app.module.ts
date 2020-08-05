import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BrokersModule } from './modules/brokers/broker.module';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, '*/**!(*.d).config.{ts,js}'), {
      path: path.resolve(process.cwd(), '.env'),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    BrokersModule,
    GroupsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
